export async function getUrl(code: string, searchParams: URLSearchParams) {
  let destinationUrl = 'https://act.vot-er.org/';

  if (code) {
    try {
      const response = await fetch('https://dashboard.vot-er.org/api/redirects/' + code);
      const json = await response.json();
      const { organizationId, customUrl } = json;

      searchParams.set('organizationId', organizationId);
      searchParams.set('ref', code);
      if (customUrl) { destinationUrl = customUrl; }
      
      destinationUrl = destinationUrl  + '?' + searchParams.toString();
    } catch (error) {
      console.log(error);
    }
  }
  
  return destinationUrl;
}
