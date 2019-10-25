import { Aurelia }             from "aurelia-framework";
import { PitayaConfiguration } from "pitaya-framework";

import environment from "./environment";

export function configure( aurelia: Aurelia )
{
	aurelia.use
		   .standardConfiguration()
		   .plugin( "pitaya-framework", ( pluginConfig: PitayaConfiguration ) => pluginConfig.enableDevelopment() )
		   .feature( "resources" );

	aurelia.use.developmentLogging( environment.debug ? "debug" : "warn" );

	aurelia.start().then( () => aurelia.setRoot() );
}
