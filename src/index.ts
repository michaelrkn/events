export default {
  async fetch(
    request: Request,
    env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const statusCode = 301;
    let destinationURL = 'https://act.vot-er.org/';

    const url = new URL(request.url);
    const { pathname, searchParams } = url;

    const code = pathname.replace('/', '');
    if (code) {
      const response = await fetch('https://dashboard.vot-er.org/api/redirects/' + code);
      const json = await response.json();
      const { organizationId, customUrl } = json;

      searchParams.set('organizationId', organizationId);
      searchParams.set('ref', code);
      if (customUrl) { destinationURL = customUrl; }
    }

    return Response.redirect(
      destinationURL + '?' + searchParams.toString(),
      statusCode
    );
  },
};
