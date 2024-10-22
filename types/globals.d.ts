import { PROFILE_TYPES } from "@/models";

export {};

// Create a type for the roles

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: PROFILE_TYPES;
    };
  }
}
