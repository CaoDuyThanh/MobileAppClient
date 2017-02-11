// Feel free to extend this interface
// depending on your app specific config.
class EnvConfig {

	HOST_API: string = 'http://192.168.1.157:4000/';

	HOST_DENSITY_API: string = 'http://192.168.1.157:4000/density';

	HOST_STREETS_API: string = 'http://192.168.1.157:4000/streets';

	HOST_CAMERA_API: string = 'http://192.168.1.157:4000/simulation';

	HOST_QUICKSEARCH_API: string = 'http://192.168.1.157:4000/quicksearch';

	HOST_STATISTIC_API: string = 'http://192.168.1.157:4000/statistic';

}

export const Config: EnvConfig = new EnvConfig();
