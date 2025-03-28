import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async (event) => {
  console.log( await event.locals.auth());
  return {

    session: await event.locals.auth(),
  }
}