import { defineField } from "sanity";

const user = {
  name: "user",
  title: "user",
  type: "document",
  fields: [
    //properties a user must have
    defineField({
      name: "isAdmin",
      title: "Is Admin",
      type: "boolean",
      description: "check if the user is admin",
      initialValue: false,
      validation: (Rule) => Rule.required(),
      // readOnly:true
      // hidden:true
    }),

    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "Name of the user",
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "image",
      title: "Image",
      type: "url",
    }),
    defineField({
      name: "password",
      type: "string",
      hidden: true,
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "emailVerified",
      type: "datetime",
      hidden: true,
    }),
    defineField({
      name: "about",
      title: "About",
      type: "text",
      description: "user description",
    }),
  ],
};

export default user;
