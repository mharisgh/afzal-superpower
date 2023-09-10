'use client'


import "react-cmdk/dist/cmdk.css";
import CommandPalette, { filterItems, getItemIndex } from "react-cmdk";
import { useState ,useEffect } from "react";
// import { renderJsonStructure, useHandleOpenCommandPalette } from "./lib/utils";

enum CommandPalettePage {
  Root = "ROOT",
  Quran = "QURAN",
}

export function renderJsonStructure(jsonStructure: JsonStructure) {
  return jsonStructure.map((list) => (
    <CommandPalette.List heading={list.heading} key={list.id}>
      {list.items.map(({ id, ...rest }) => (
        <CommandPalette.ListItem
          index={getItemIndex(jsonStructure, id)}
          key={id}
          {...rest}
        />
      ))}
    </CommandPalette.List>
  ));
}

export function useHandleOpenCommandPalette(
  setIsOpen: Dispatch<SetStateAction<boolean>>
) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (
        (navigator?.platform?.toLowerCase().includes("mac")
          ? e.metaKey
          : e.ctrlKey) &&
        e.key === "k"
      ) {
        e.preventDefault();
        e.stopPropagation();

        setIsOpen((currentValue) => {
          return !currentValue;
        });
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
}

const Example = () => {
  const [page, setPage] = useState<CommandPalettePage>(CommandPalettePage.Root);
  // const [open, setOpen] = useState<boolean>(true);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState<boolean>(true);

  useHandleOpenCommandPalette(setIsOpen)
  

  const filteredItems = filterItems(
    [
      {
        heading: "Home",
        id: "home",
        items: [
          {
            id: "home",
            children: "Home",
            icon: "HomeIcon",
            href: "#",
          },
          {
            id: "settings",
            children: "Settings",
            icon: "CogIcon",
            href: "#",
          },
        ],
      },

      // Quran section

      {
        heading: "Read",
        id: "read",
        items: [
          {
            id: "quran",
            children: "Quran",
            icon: "CodeBracketIcon",
            closeOnSelect:false,
            onClick: () => {
              setPage(CommandPalettePage.Quran)
              setSearch("")
            }
          },
          {
            id: "hadees",
            children: "hadees",
            icon: "ReceiptPercentIcon",
            href: "#",
          },
        ]
      },

      // other titled section

      {
        heading: "Other",
        id: "advanced",
        items: [
          {
            id: "developer-settings",
            children: "Developer settings",
            icon: "CodeBracketIcon",
            href: "#",
          },
          {
            id: "privacy-policy",
            children: "Privacy policy",
            icon: "LifebuoyIcon",
            href: "#",
          },
          {
            id: "log-out",
            children: "Log out",
            icon: "ArrowRightOnRectangleIcon",
            onClick: () => {
              alert("Logging out...");
            },
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
          href: "https://quran.com/en/al-fatihah", target:"_blank",
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
        // {
        //   id: "projects",
        //   children: "Projects",
        //   icon: "RectangleStackIcon",
        //   closeOnSelect: false,
        //   onClick: () => {
        //     setPage("projects");
        //   },
        // },
      ],
    },
  ],search);

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
      onEscape={() => {setPage(CommandPalettePage.Root)}}>
        {renderJsonStructure(documentationItems)}
      </CommandPalette.Page>
    </CommandPalette>
  );
};

export default Example;