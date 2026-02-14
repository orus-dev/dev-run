"use server";

import * as Core from "./server";

export async function getOrigin() {
  return Core.getOrigin();
}
