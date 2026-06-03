export interface IProjectLink {
	label: string;
	url: string;
	primary?: boolean;
}

export interface IProject {
	name: string;
	tagline: string;
	description: string;
	categories: string[];
	accentColor: string;
	brandBg: string;
	status: string;
	statusLive: boolean;
	features: string[];
	tech: string[];
	links: IProjectLink[];
	currentWork?: string;
}