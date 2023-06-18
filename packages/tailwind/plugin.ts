import plugin from "tailwindcss/plugin";
import { fontFamily } from "tailwindcss/defaultTheme";

export default plugin(
	function ({ addUtilities, addBase }) {
		// css variables
		addBase({
			":root": {
				"--background": "0 0% 100%",
				"--foreground": "222.2 47.4% 11.2%",
				"--muted": "210 40% 96.1%",
				"--muted-foreground": "215.4 16.3% 46.9%",
				"--popover": "0 0% 100%",
				"--popover-foreground": "222.2 47.4% 11.2%",
				"--card": "0 0% 100%",
				"--card-foreground": "222.2 47.4% 11.2%",
				"--border": "214.3 31.8% 91.4%",
				"--input": "214.3 31.8% 91.4%",
				"--primary": "222.2 47.4% 11.2%",
				"--primary-foreground": "210 40% 98%",
				"--secondary": "210 40% 96.1%",
				"--secondary-foreground": "222.2 47.4% 11.2%",
				"--accent": "210 40% 96.1%",
				"--accent-foreground": "222.2 47.4% 11.2%",
				"--destructive": "0 100% 50%",
				"--destructive-foreground": "210 40% 98%",
				"--ring": "215 20.2% 65.1%",
				"--radius": "0.5rem",
				"--info": "214 95% 93%",
				"--warning": "34 100% 92%",
			},
			".dark": {
				"--background": "224 71% 4%",
				"--foreground": "213 31% 91%",
				"--muted": "223 47% 11%",
				"--muted-foreground": "215.4 16.3% 56.9%",
				"--popover": "224 71% 4%",
				"--popover-foreground": "215 20.2% 65.1%",
				"--card": "224 71% 4%",
				"--card-foreground": "213 31% 91%",
				"--border": "216 34% 17%",
				"--input": "216 34% 17%",
				"--primary": "210 40% 98%",
				"--primary-foreground": "222.2 47.4% 1.2%",
				"--secondary": "222.2 47.4% 11.2%",
				"--secondary-foreground": "210 40% 98%",
				"--accent": "216 34% 17%",
				"--accent-foreground": "210 40% 98%",
				"--destructive": "0 63% 31%",
				"--destructive-foreground": "210 40% 98%",
				"--ring": "216 34% 17%",
				"--radius": "0.5rem",
				"--info": "214 95% 93%",
				"--warning": "34 100% 92%",
			},
		});

		// global styles
		addBase({
			"*": { "@apply border-border": {} },
			html: { "--font-sans": "'Inter', sans-serif" },
			":focus": { outline: "none" },
			body: {
				"@apply bg-background text-foreground": {},
				fontFeatureSettings: '"rlig" 1, "calt" 1',
				scrollBehavior: "smooth",
			},
			thead: {
				"@apply px-4 text-left align-middle font-medium text-muted-foreground":
					{},
			},
			"tr:hover": { "@apply bg-muted/50": {} },
			tr: { "@apply border-b transition-colors": {} },
			td: { "@apply p-4 align-middle": {} },
			th: { "@apply max-w-[10rem]": {} },
		});
	},
	{
		theme: {
			container: {
				center: true,
				padding: "2rem",
				screens: {
					"2xl": "1400px",
				},
			},
			screens: {
				xs: "475px",
				sm: "640px",
				md: "768px",
				lg: "1024px",
				xl: "1280px",
				"2xl": "1536px",
				"3xl": "1600px",
			},
			extend: {
				colors: {
					border: "hsl(var(--border))",
					input: "hsl(var(--input))",
					ring: "hsl(var(--ring))",
					background: "hsl(var(--background))",
					foreground: "hsl(var(--foreground))",
					info: "hsl(var(--info))",
					warning: "hsl(var(--warning))",
					primary: {
						DEFAULT: "hsl(var(--primary))",
						foreground: "hsl(var(--primary-foreground))",
					},
					secondary: {
						DEFAULT: "hsl(var(--secondary))",
						foreground: "hsl(var(--secondary-foreground))",
					},
					destructive: {
						DEFAULT: "hsl(var(--destructive))",
						foreground: "hsl(var(--destructive-foreground))",
					},
					muted: {
						DEFAULT: "hsl(var(--muted))",
						foreground: "hsl(var(--muted-foreground))",
					},
					accent: {
						DEFAULT: "hsl(var(--accent))",
						foreground: "hsl(var(--accent-foreground))",
					},
					popover: {
						DEFAULT: "hsl(var(--popover))",
						foreground: "hsl(var(--popover-foreground))",
					},
					card: {
						DEFAULT: "hsl(var(--card))",
						foreground: "hsl(var(--card-foreground))",
					},
				},
				typography: {
					DEFAULT: {
						css: {
							h1: {
								"margin-top": "1.25em",
							},
							h2: {
								"margin-top": "1em",
							},
							h3: {
								"margin-top": "0.75em",
							},
							h4: {
								"margin-top": "0.5em",
							},
							p: {
								"margin-top": "1em",
								"margin-bottom": "1em",
							},
							ul: {
								"margin-top": "1em",
								"margin-bottom": "1em",
								"line-height": "1.5em",
							},
							li: {
								"margin-top": "0.3em",
								"margin-bottom": "0.3em",
							},
							figure: {
								"margin-top": "1em",
								"margin-bottom": "1em",
							},
							img: {
								"margin-top": "1em",
								"margin-bottom": "1em",
							},
						},
					},
					quoteless: {
						css: {
							"blockquote p:first-of-type::before": { content: "none" },
							"blockquote p:first-of-type::after": { content: "none" },
						},
					},
				},
				borderRadius: {
					lg: "var(--radius)",
					md: "calc(var(--radius) - 2px)",
					sm: "calc(var(--radius) - 4px)",
				},
				fontFamily: {
					sans: ["var(--font-sans)", ...fontFamily.sans],
					serif: ["var(--font-serif)", ...fontFamily.serif],
					mono: ["var(--font-mono)", ...fontFamily.mono],
					handwritten: ["var(--font-handwritten)"],
				},
				keyframes: {
					"accordion-down": {
						from: { height: "0" },
						to: { height: "var(--radix-accordion-content-height)" },
					},
					"accordion-up": {
						from: { height: "var(--radix-accordion-content-height)" },
						to: { height: "0" },
					},
				},
				animation: {
					"accordion-down": "accordion-down 0.2s ease-out",
					"accordion-up": "accordion-up 0.2s ease-out",
				},
			},
		},
	},
);
