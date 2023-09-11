'use client'

import "react-cmdk/dist/cmdk.css";
import CommandPalette, { JsonStructure, filterItems, getItemIndex, } from "react-cmdk";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
// import { renderJsonStructure, useHandleOpenCommandPalette } from "./lib/utils";
import { renderJsonStructure, useHandleOpenCommandPalette } from "react-cmdk";
import Image from "next/image";

enum CommandPalettePage {
  Root = "ROOT",
  Quran = "QURAN",
  Hadith = "HADITH",
}

const Example = () => {
  const [page, setPage] = useState<CommandPalettePage>(CommandPalettePage.Root);
  // const [open, setOpen] = useState<boolean>(true);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState<boolean>(true);

  useHandleOpenCommandPalette(setIsOpen)

  // ============================================================
  // Root page
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
            closeOnSelect: false,
            onClick: () => {
              setPage(CommandPalettePage.Hadith)
              setSearch("")
            }
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
            onClick: () => {
              alert("Type your prompt. see the result without leaving here.  but work going on..!");
            },
            closeOnSelect: false,
          },
          {
            id: "mid-journey",
            children: "Mid Journey",
            icon: "CameraIcon",
            closeOnSelect: false,
            onClick: () => {
              alert("Generate image from here.. We're working on it...");
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

  // Quran page
  const quranList = filterItems([
    {
      id: "quran",
      heading: "Quran",
      items: [
        {
          id: "quran.surah1",
          children: "Al Fatihah",
          icon: "BookOpenIcon",
          href: "https://quran.com/1", target: "_blank",
        },
        {
          id: "quran.surah2",
          children: "Al Bakarah",
          icon: "BookOpenIcon",
          href: "https://quran.com/2", target: "_blank",
        },
        {
          id: "quran.surah3",
          children: "Al Imran",
          icon: "BookOpenIcon",
          href: "https://quran.com/3", target: "_blank",
        },
        {
          id: "quran.surah4",
          children: "An Nisa",
          icon: "BookOpenIcon",
          href: "https://quran.com/4", target: "_blank",
        },
      ],
    },
  ], search);

  // Hadith page
  const hadithList = filterItems([
    {
      id: "hadith",
      heading: "Hadith",
      items: [
        {
          id: "hadith-1",
          children: "Al Bukhari",
          icon: "UserIcon",
          closeOnSelect: false,
          onClick: () => {
            alert("You'll see full list of hadith inside your search bar.. work going on..!");
          },
        },
        {
          id: "hadith-2",
          children: "Sahih Muslim",
          icon: "UserIcon",
          closeOnSelect: false,
          onClick: () => {
            alert("You'll see full list of hadith inside your search bar.. work going on..!");
          },
        },
        {
          id: "hadith-3",
          children: "An Nasai",
          icon: "UserIcon",
          closeOnSelect: false,
          onClick: () => {
            alert("You'll see full list of hadith inside your search bar.. work going on..!");
          },
        },
        {
          id: "hadith-4",
          children: "At Tirmihi",
          icon: "UserIcon",
          closeOnSelect: false,
          onClick: () => {
            alert("You'll see full list of hadith inside your search bar.. work going on..!");
          },
        },
      ],
    },
  ], search);

  // ============================================================

  return (
    <>
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
          {renderJsonStructure(quranList)}
        </CommandPalette.Page>

        <CommandPalette.Page id={CommandPalettePage.Hadith}
          onEscape={() => { setPage(CommandPalettePage.Root) }}>
          {renderJsonStructure(hadithList)}
        </CommandPalette.Page>


      </CommandPalette>
      {/* Other text contents */}
      <div className="">
        <h1 className="text-gray-400 mt-6 md:mt-10 text-center text-xl md:text-3xl">أسلم عليكم</h1>

        <div className="flex top-3 md:top-8 items-center gap-4 right-5 md:right-10 fixed ">
          <p className="hidden md:block">Muhammad Afzal</p>
          <div className="w-[50px] h-[50px] bg-red-300 rounded-full overflow-hidden ">
            {/* <img src="/profile.jpeg" alt="sdfsd" /> */}
            <Image
              src="/profile.jpeg"
              width={50}
              height={50}
              alt="Picture of the user"
            />
          </div>
        </div>

        <h1 className="text-center mt-12 px-6 leading-10 text-[2.5rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-purple-500 to-cyan-600">Superpower <span className="">to your finger</span></h1>
        <p className="text-lg text-gray-400 text-center mt-4">Find at the speed of thought</p>

        {/* keyboard icons */}
        <div className="hidden md:flex mt-4 justify-center w-full">
          <img className="" src="/ctrlk.svg" alt="" />
        </div>
        <p className="hidden md:block text-gray-400 text-sm mt-2 text-center">One magic shortcut</p>


        <div className="flex items-center  gap-4 absolute bottom-16 ml-[50%] -translate-x-[50%]">
          <p className="text-gray-400 text-sm">Tools Used</p>
          <img className="" src="/next.png" alt="" width="22px" height="22px" />
          <img className="" src="/ts.png" alt="" width="22px" height="22px" />
          <img className="" src="/tw.png" alt="" width="22px" height="22px" />
        </div>

        <p className="text-gray-400 absolute text-sm  w-full md:text-normal bottom-4 flex justify-center">Made with 💖 by <a href="http://www.barmej.tech" target="_blank">Haris bin Husain</a></p>

      </div>

    </>
  );
};

export default Example;