export class App
{
	private _navigationIconClicked()
	{
		console.log( "nav icon clicked" );
	}

	private _actionClicked( message: string )
	{
		console.log( "Icon clicked: ", message );
	}
}
