'use client'

import "react-cmdk/dist/cmdk.css";
import CommandPalette, { JsonStructure, filterItems, getItemIndex, } from "react-cmdk";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
// import { renderJsonStructure, useHandleOpenCommandPalette } from "./lib/utils";
import { renderJsonStructure, useHandleOpenCommandPalette } from "react-cmdk";

enum CommandPalettePage {
  Root = "ROOT",
  Quran = "QURAN",
}

const Example = () => {
  const [page, setPage] = useState<CommandPalettePage>(CommandPalettePage.Root);
  // const [open, setOpen] = useState<boolean>(true);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState<boolean>(true);

  useHandleOpenCommandPalette(setIsOpen)

  const filteredItems = filterItems(
    [
      // Read section
      {
        heading: "Read",
        id: "read",
        items: [
          {
            id: "quran",
            children: "Quran",
            icon: "BookOpenIcon",
            closeOnSelect: false,
            onClick: () => {
              setPage(CommandPalettePage.Quran)
              setSearch("")
            }
          },
          {
            id: "hadith",
            children: "Hadith",
            icon: "AcademicCapIcon",
            href: "#",
          },
        ]
      },
      // Prompt
      {
        heading: "Prompt",
        id: "suggestion",
        items: [
          {
            id: "chat-gpt",
            children: "Chat GPT",
            icon: "ChatBubbleLeftEllipsisIcon",
            href: "#",
          },
          {
            id: "mid-journey",
            children: "Mid Journey",
            icon: "CameraIcon",
            onClick: () => {
              alert("We're working on it...");
            },
          },
        ],
      },
      // Actions
      {
        heading: "Actions",
        id: "actions",
        items: [
          {
            id: "translate",
            children: "Translate",
            icon: "DocumentMagnifyingGlassIcon",
            href: "https://translate.google.co.in/", target: "_blank",
          },
        ],
      },
    ],
    search
  );

  const documentationItems = filterItems([
    {
      id: "quran",
      heading: "Quran",
      items: [
        {
          id: "quran.surah1",
          children: "Surah Al Fatihah",
          icon: "HomeIcon",
          href: "https://quran.com/en/al-fatihah", target: "_blank",
        },
        {
          id: "quran.surah2",
          children: "Surah Al Bakarah",
          icon: "HomeIcon",
          href: "#",
        },
        {
          id: "quran.surah3",
          children: "Surah Al Imran",
          icon: "HomeIcon",
          href: "#",
        },
      ],
    },
  ], search);

  return (
    <CommandPalette
      onChangeSearch={setSearch}
      onChangeOpen={setIsOpen}
      search={search}
      isOpen={isOpen}
      page={page}
    >
      <CommandPalette.Page id={CommandPalettePage.Root}>
        {filteredItems.length ? (
          filteredItems.map((list) => (
            <CommandPalette.List key={list.id} heading={list.heading}>
              {list.items.map(({ id, ...rest }) => (
                <CommandPalette.ListItem
                  key={id}
                  index={getItemIndex(filteredItems, id)}
                  {...rest}
                />
              ))}
            </CommandPalette.List>
          ))
        ) : (
          <CommandPalette.FreeSearchAction />
        )}
      </CommandPalette.Page>

      <CommandPalette.Page id={CommandPalettePage.Quran}
        onEscape={() => { setPage(CommandPalettePage.Root) }}>
        {renderJsonStructure(documentationItems)}
      </CommandPalette.Page>
    </CommandPalette>
  );
};

export default Example;