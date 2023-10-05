// Default setting (blurred chunks, button to move to next chunk, feedback modals, etc.)
// Refer to #question-generation for more details

"use client"; 

import React, { useEffect, useState, useRef, useContext } from 'react';
import { useMDXComponent } from "next-contentlayer/hooks";
import { cn } from "@itell/core/utils";
import { buttonVariants } from "@itell/ui/server";
import { AlertTriangle, ThumbsUp, ThumbsDown } from "lucide-react";
import { qContext } from "@/components/contexthandler";

import { QAScoreSchema } from "@/trpc/schema";
import { TEXTBOOK_NAME } from "@/lib/constants";
import { env } from "@/env.mjs";

interface ChunkifyProps {
  children: React.ReactNode;
};


const getQAScore = async ({
  input, chapter, section, subsection
}: { input: string, chapter: number, section: number, subsection: number}) => {
  const response = await fetch(`${env.NEXT_PUBLIC_SCORE_API_URL}/answer`, {
    method: "POST",
    body: JSON.stringify({
      textbook_name: TEXTBOOK_NAME,
      chapter_index: chapter,
      section_index: section,
      subsection_index: subsection,
      answer: input,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return QAScoreSchema.safeParse(data);
};


export const Chunkify = ({ children } : ChunkifyProps) => {
  // Manage the currently visible chunk
  const [currentChunk, setCurrentChunk] = useState(0);
  // Manage the chunk in which the question will appear
  // const [randomQuestionChunk, setRandomQuestionChunk] = useState<number | null>(null);
  // Manage feedback modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Check if feedback is positive or negative
  const [positiveFeed, setPositiveFeed] = useState(false);
  const [negativeFeed, setNegativeFeed] = useState(false);
  // QA input
  const [inputValue, setInputValue] = useState("");
  // Ref for current chunk
  const currentChunkRef = useRef<HTMLDivElement | null>(null);

  // Function to scroll to the currentChunk
  const scrollCurrent = () => {
    // Check if the ref exists
    if (currentChunkRef.current) {
      // Scroll to the currentChunk element
      currentChunkRef.current.scrollIntoView({
        behavior: 'smooth', 
        block: 'start',  
      });
    }
  };

  // Extract chunks
  const chunks = React.Children.toArray(children);

  // Show the next chunk
  const handleNextChunk = () => {
    if (currentChunk < chunks.length - 1) {
      setCurrentChunk(currentChunk + 1);
    }
  };

  // Choose a random chunk for the question
  // const chooseRandomQuestionChunk = () => {
  //   const randomIndex = Math.floor(Math.random() * (chunks.length - 1));
  //   setRandomQuestionChunk(randomIndex);
  // };


  // When positive review is clicked
  const positiveModal = () => {
    setIsModalOpen(true);
    setPositiveFeed(true);
  };

  // When negative review is clicked
  const negativeModal = () => {
    setIsModalOpen(true);
    setNegativeFeed(true);
  };

  // Open modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close modal and reset neg/pos states
  const closeModal = () => {
    setIsModalOpen(false);
    setNegativeFeed(false);
    setPositiveFeed(false);
  };

  const qObj = useContext(qContext);

  if (qObj === null || qObj === undefined) {
    // Handle the case where qObj is null or undefined
    // You can choose to render a message or take appropriate action
    return (
      <div>
        qObj is null or undefined
      </div>
    );
  };

  // Generate a random index
  const randomQuestionChunk = Math.floor(Math.random() * qObj.length);

  // Select the row at the random index
  const randomQuestionContent = qObj[randomQuestionChunk].question!;
  const randomQuestionSubsection = qObj[randomQuestionChunk].subsection!;

  // Split the string by the '-' delimiter
  const sectionID = qObj[randomQuestionChunk].sectionId.split("-");

  // Convert the substrings to integers
  const chapter = parseInt(sectionID[0], 10); // 10 specifies base 10 (decimal)
  const section = parseInt(sectionID[1], 10);
  const subsection = qObj[randomQuestionChunk].subsection;

  // Handle the Submit button click
  const handleSubmitClick = async () => {

    const response = await getQAScore({input:inputValue, chapter, section, subsection});

    if (!response.success) {
              // API response is not in correct shape
              console.error("API Response error", response);
              return;
    };
    
    const result = response.data;
    console.log(result);
    if (result.is_passing) {
      handleNextChunk(); // Move to the next chunk
    } else {
      console.log('!!!')
    };

  };

  // useEffect(() => {
  //   // chooseRandomQuestionChunk();
  //   }, []);

  return (
    <div>

      {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white flex justify-center items-center p-4 gap-2 border-2 my-4 border-indigo-700 rounded-md w-1/2 mx-auto flex-col">
                {/* Modal content */}
                <h2>Additional feedback</h2>
                <div className="w-3/4">
                  <textarea rows={3} className="rounded-md shadow-md w-full p-4 mb-4" placeholder="Tell us more about your experience and how we can improve iTELL AI." /> 
                  {negativeFeed && (
                  <div className="flex flex-col justify-start mb-4 w-full">
                    <div>
                      <input id="default-checkbox1" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                      <label htmlFor="default-checkbox1" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">This is nonsensical</label>
                    </div>
                    <div>
                      <input id="default-checkbox2" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                      <label htmlFor="default-checkbox2" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">This is inaccurate</label>
                    </div>
                    <div>
                      <input id="default-checkbox3" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                      <label htmlFor="default-checkbox3" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">This is harmful</label>
                    </div>
                  </div>)}
                  {positiveFeed && (
                  <div className="flex flex-col justify-start mb-4 w-full">
                    <div>
                      <input id="default-checkbox4" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                      <label htmlFor="default-checkbox4" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">This is informative</label>
                    </div>
                    <div>
                      <input id="default-checkbox5" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                      <label htmlFor="default-checkbox5" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">This is supportive</label>
                    </div>
                    <div> 
                      <input id="default-checkbox6" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                      <label htmlFor="default-checkbox6" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">This is helpful</label>
                    </div>
                  </div>)}
                </div>
                <button className={cn(
                      buttonVariants({ variant: "secondary" }), "mb-4"
                    )} onClick={closeModal}>
                  Submit feedback
                </button>
              </div>
            </div>
          )}


      {chunks.map((chunk, index) => (
        <div
          key={index}
          ref={index === currentChunk ? currentChunkRef : null}
          style={{
            filter: index <= currentChunk ? 'none' : 'blur(4px)',
            transition: 'filter 0.25s ease-in-out',
          }}
        >
          {chunk}
          {index === currentChunk && index < chunks.length - 1 && (
             <div>

              {randomQuestionSubsection === index ? (
                <div className="flex justify-center items-center flex-col p-4 gap-2 border-4 my-4 border-teal-400 rounded-md max-w-3xl mx-auto">
                  
                  <div className="flex justify-end items-center flex-row mt-2 mb-1 w-full">
                    <ThumbsUp className="hover:stroke-emerald-400 hover:cursor-pointer h-4" onClick={positiveModal} />
                    <ThumbsDown className="hover:stroke-rose-700 hover:cursor-pointer h-4" onClick={negativeModal} />
                  </div>

                  <div className="flex justify-center items-center text-xs my-2 font-light text-zinc-400">
                    <p className="inline-flex"> <AlertTriangle className="stroke-yellow-400 mr-2" /> iTELL AI is in alpha testing. 
                    It will try its best to help you but it can still make mistakes. 
                    Let us know how you feel about iTELL AI's performance using the feedback icons on the top right side of this box
                    (thumbs up or thumbs down). </p>
                  </div>

                  {randomQuestionContent !== undefined && (<p><b>Question:</b> {randomQuestionContent}</p> )}
                  
                  <input
                    className="rounded-md shadow-md w-3/4 p-4 mb-4" 
                    value={inputValue}
                    type="text"
                    onChange={(e) => setInputValue(e.currentTarget.value)}
                  /> 
                  <button className={cn(
                      buttonVariants({ variant: "secondary" }), "mb-4"
                    )} 
                          onClick={handleSubmitClick}
                  >Submit</button>
                </div>
              ) : (<div className="flex justify-center items-center p-4 gap-2">
                      <button className={cn(
                                buttonVariants({ variant: "secondary" }), "bg-red-400  hover:bg-red-200 text-white m-2 p-2"
                              )} onClick={handleNextChunk}>Click Here to Continue Reading</button>
                      <span className="absolute left-0 w-1/4 h-px bg-red-800 opacity-50"></span> 
                      <span className="absolute right-0 w-1/4 h-px bg-red-800 opacity-50"></span>
                    </div>
                  )}

            </div>
          )}
        </div>
      ))}

      {currentChunk < chunks.length - 1 && (
        <div className="flex justify-center items-center p-4 gap-2">
                      <button className={cn(
                                buttonVariants({ variant: "secondary" }), "bg-emerald-400  hover:bg-emerald-200 text-white m-2 p-2"
                              )} onClick={scrollCurrent}>Click Here to Scroll Back Up to Your Current Subsection</button>
                      <span className="absolute left-0 w-1/4 h-px bg-emerald-800 opacity-50"></span> 
                      <span className="absolute right-0 w-1/4 h-px bg-emerald-800 opacity-50"></span>
                    </div>

      )}

    </div>
  );
};
