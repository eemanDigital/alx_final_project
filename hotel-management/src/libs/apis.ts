import sanityClient from "./sanity";
import { Room } from "@/models/room";
import * as queries from "./sanityQuery";

export async function getFeaturedRoom() {
  const result = await sanityClient.fetch<Room>(
    queries.getFeaturedRoomQuery,
    {},
    { cache: "no-cache" }
  );
  return result;
}

export async function getRooms() {
  const result = await sanityClient.fetch<Room[]>(queries.getRoomsQuery);
  return result;
}
