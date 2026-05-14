import config from 'C:/Repos/Playwright_Setup';
import {expect} from '@playwright/test';

const validateConfig = () => {
	const hasBaseURL = !!config.use?.baseURL;
	console.log('Has baseURL: ${hasBaseURL}');
	
	const projectCount = config.projects?.length || 0;
	console.log('Project count: ${projectCount}');
	
	if(!hasBaseURL || projectCount !==2){
		throw new Error("Config validation failed");
	}
	

};

validateConfig();
