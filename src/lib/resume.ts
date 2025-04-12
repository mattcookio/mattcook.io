export interface ResumeItem {
	title: string;
	date?: string;
	description?: string;
	points?: string[];
	subItems?: ResumeItem[]; // For nested items like within Hively experience
	points_after_subItems?: string[]; // Points to render after subItems
}

export interface ResumeSection {
	id: string; // Unique ID for keys and state management
	title: string;
	items: ResumeItem[];
}

export interface SkillsSection {
	id: string;
	title: string;
	strengths: string[];
	technologies: string[];
}

// Type guard to differentiate sections
export function isSkillsSection(section: ResumeSection | SkillsSection): section is SkillsSection {
	return section.id === 'skills';
}

export const resumeData: Array<ResumeSection | SkillsSection> = [
	{
		id: 'education',
		title: 'Education',
		items: [
			{
				title: 'MBA, Data Analytics and Business Intelligence (4.0 GPA)',
				date: 'July 2019',
				points: [
					'Lucas Sterne & Albert G. Spaeth Graduate Business Scholarship',
					'Graduate Student Achievement Award'
				]
			},
			{
				title: 'BM, Jazz/Commercial Music',
				date: 'May 2017',
				points: ['UCM Music Dept. "Outstanding Senior" Award']
			}
		]
	},
	{
		id: 'skills',
		title: 'Skills + Strengths',
		strengths: [
			'Software Architecture',
			'CI/CD and Dev-Ops',
			'UX Awareness',
			'Manual and Automated Testing',
			'Practical knowledge of AI (both usage/prompting, and implementing app features using AI services)',
			'Asking Questions',
			'Pragmatism',
			'Kindness',
			'Enthusiasm'
		],
		technologies: [
			'Full-Stack Typescript + Javascript',
			'Neovim',
			'React',
			'GraphQL',
			'Vue',
			'Svelte',
			'Next.js',
			'Nest.js',
			'Material UI',
			'Tailwind',
			'Docker',
			'PostgreSQL',
			'AWS',
			'Gulp',
			'Express',
			'Sass',
			'CSS',
			'Golang',
			'Python',
			'and more'
		]
	},
	{
		id: 'experience',
		title: 'Professional Experience',
		items: [
			{
				title: 'Lead Software Engineer, Brightway Insurance',
				date: 'August 2024 - Present',
				description: undefined // Placeholder for potential future description
			},
			{
				title: 'Co-Founder & CTO, Hively',
				date: 'October 2021 - Present',
				points: [
					'Designed and built core application infrastructure while establishing strong security standards, and employing automated deployment/scaling/testing.',
					'Designed and optimized PostgreSQL database for various application needs',
					'Led a small, diverse team of full/part-time developers, moonlighters, and founders, fostering a collaborative and innovative environment.',
					'Built a robust, flexible, maintainable, multi-tenant solution from the ground up using Typescript, Node, and React, including:'
				],
				subItems: [
					{ title: 'The ability for partners to white-label the entire solution' },
					{
						title:
							'Event-based request and notification infrastructure, serving various needs of clients and their residents'
					},
					{ title: 'Calendar, event, attendee and organizer management' },
					{
						title:
							'Cross-tenant administrative features for feature/subscription management and troubleshooting'
					},
					{
						title:
							'Payments and invoicing infrastructure via in-app Stripe integration, both for customer subscriptions and to facilitate payments from residents to client organizations'
					},
					{
						title:
							'Space and resource management, including ability to set prices/time constraints, and allow requests from the public, while gathering necessary information from requesters via request questions'
					},
					{
						title:
							'Athletics program management, registration, question-driven forms, and ai-driven auto-scheduling of leagues'
					},
					{
						title: 'Public portal for users to enroll in athletics programs and track their events'
					},
					{ title: 'Automated E2E testing' },
					{ title: 'CI/CD pipeline for safe and lightning fast release cycle' },
					{ title: 'A customer facing API for critical functions of the app' }
				],
				points_after_subItems: [
					'Enabled various data migrations (spaces, events, resources) from an existing enterprise platform supporting hundreds of universities and university systems into our new platform via a partner API',
					'Served as a liaison to company partners, defining integration requirements and strategies, coordinating and balancing many priorities, requirements, and interests of stakeholders.',
					'Participate in core business development discussions - partnerships, roadmap, strategy, marketing.',
					'Provide direct support to both customers, their residents, and our company partners/integrations'
				]
			},
			{
				title: 'Software Engineer III, EquipmentShare',
				date: 'July – October 2021',
				points: [
					'Implemented automated testing infrastructure to increase platform stability for mission-critical regulatory truck driver log application.',
					'Expanded and maintained GraphQL API supporting web and mobile applications.'
				]
			},
			{
				title: 'Software Engineer, RFP360',
				date: 'April – July 2021',
				points: [
					'Member of product escalations team, triaging and resolving issues that need code changes on a platform utilizing Spring, AWS EKS, and React.'
				]
			},
			{
				title: 'Software Engineer, Ad Astra',
				date: 'November 2018 – April 2021',
				points: [
					"Heavily utilized various AWS services while building out Ad Astra's next-generation platform - Lambda, SNS, SQS, Athena/Glue, DynamoDB, ECS, CloudTrail, CloudWatch, Cognito, IAM, and others, as well as CDK for IaC",
					'Led a cross-team effort to decouple microservices, and improve dynamic discovery of serverless AWS microservices and queues.',
					'Elected to represent 2 separate teams, discussing organizational/architectural concerns, and gathering/sharing information as necessary to support a distributed system',
					'Advocated for use of new services and tools to advance/improve our architecture and infrastructure',
					'Received a development department peer-to-peer award, for being kind, and making myself available to help, advise, and mentor any time I am needed',
					'Founding member of Security Task Force – 4-man group that helped research and refine organizational security standards, as well as vet training materials for developers.'
				]
			},
			{
				title: 'Team Lead, Kansas City Pet Project',
				date: 'August 2017 - May 2018',
				points: [
					'Worked with a team of ~4 to take care of basic needs (food, water, cleaning, health observation, and mental stimulation/enrichment) for 100-150 dogs on any given day with limited resources and severely aging infrastructure',
					'Counseled potential adopters on animal care, health history, and behavior',
					'Led a team at the retail location, caring for both dogs and cats, adoption counseling, medications, inventory management, etc.'
				]
			}
		]
	},
	{
		id: 'volunteer',
		title: 'Volunteer Experience',
		items: [
			{
				title: 'OSS Developer, Code For America (KCMO)',
				date: 'August – December 2019',
				points: [
					'Led several self-taught, aspiring developers and worked with external stakeholders to gather requirements, identify MVP, and ship a very simple open source calculator that helps citizens better understand the Kansas City Kansas Neighborhood Revitalization Act and their personal benefit.'
				]
			},
			{
				title: 'Tech Coach, KC Public Library / LaunchCode',
				date: 'April 2019',
				points: [
					'Helped patrons at the Kansas City Public Library understand and operate library technology, write resumes, etc.'
				]
			}
		]
	},
	{
		id: 'recognition',
		title: 'Recognition and Awards',
		items: [
			{
				title: '',
				points: [
					'Cloud Security Alliance Certificate of Cloud Security Knowledge (CCSK)',
					'1st Prize - American Jazz Museum Composition Contest',
					'All-State and All-Collegiate Jazz Ensembles'
				]
			}
		]
	}
];
