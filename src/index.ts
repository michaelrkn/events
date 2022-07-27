import { getUrl } from './get-url';

export default {
  async fetch(
    request: Request,
    env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const requestUrl = new URL(request.url);
    const code = requestUrl.pathname.replace('/', '');
		const searchParams = requestUrl.searchParams

    const destinationUrl = await getUrl(code, searchParams);

    return Response.redirect(destinationUrl, 301);
  },
};
