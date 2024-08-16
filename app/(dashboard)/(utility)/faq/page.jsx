"use client";
import React, { Fragment } from "react";
import Accordion from "@/components/ui/Accordion";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import { Tab } from "@headlessui/react";

const faqmenus = [
  {
    title: "Start",
  },
  {
    title: "Polityka prywatności i bezpieczeństwo",
  },
];
const items = [
  {
    title: "Jak działa AI Asystent?",
    content:
      "AI Asystent działa, wykorzystując zaawansowane algorytmy sztucznej inteligencji, które przetwarzają naturalny język. Odpowiada na pytania, generuje treści i wykonuje inne zadania w obrębie działalności firmy Frodo.",
  },
  {
    title: "Co zrobić jeżeli Asystent nie odpowiada?",
    content:
      "Rozpoczniej rozmowę od sformułowania: Cześć Frodo! Bywa, że z powodów od nas niezależnych liczba (działanie modułów OpenAI) odpowiedź jest ograniczona. W takim przypadku prosimy o ponowne zapytanie później, lub o kontakt telefoniczny z naszym działem wsparcia.",
  },
];
const items2 = [
  {
    title: "Zbieranie danych",
    content:
      "AI Asystenci działają na podstawie danych, które są dostarczane przez użytkowników. Może to obejmować tekst, obrazy, dane osobowe lub inne informacje, które są przetwarzane w celu udzielenia odpowiedzi lub wykonania określonych zadań. Kluczowe jest zrozumienie, że każda interakcja z AI może wiązać się z przekazywaniem danych, które mogą być analizowane, przechowywane lub wykorzystywane do dalszego doskonalenia modelu AI.",
  },
  {
    title: "Ochrona prywatności użytkowników",
    content:
      "Ochrona prywatności użytkowników to fundament działania AI Asystentów. Użytkownicy mają prawo wiedzieć, jakie dane są zbierane i jak są przetwarzane. Mają również prawo zażądać usunięcia swoich danych z systemu. Dane użytkowników nie są udostępniane stronom trzecim bez zgody użytkownika, chyba że wymagają tego przepisy prawne.",
  },
  {
    title: "Bezpieczeństwo",
    content:
      "Bezpieczeństwo danych jest priorytetem dla dostawców AI Asystentów. Dane przesyłane między użytkownikiem a serwerem są szyfrowane, co zabezpiecza je przed przechwyceniem przez osoby trzecie. Dostęp do danych jest ściśle kontrolowany, a tylko upoważnieni pracownicy mogą korzystać z tych danych w celu świadczenia usługi. Silne hasła i dwuskładnikowe uwierzytelnianie (2FA) zabezpieczają konta użytkowników przed nieautoryzowanym dostępem.",
  },
];

const FaqPage = () => {
  return (
    <div>
      <Tab.Group>
        <div className="grid gap-5 grid-cols-12">
          <div className="xl:col-span-3 lg:col-span-4 col-span-12 card-auto-height">
            <Card>
              <Tab.List className="flex flex-col space-y-1 text-start items-start">
                {faqmenus.map((item, i) => (
                  <Tab key={i} as={Fragment}>
                    {({ selected }) => (
                      <button
                        className={`focus:ring-0 focus:outline-none space-x-2 text-sm flex items-center w-full transition duration-150 px-3 py-4 rounded-[6px] rtl:space-x-reverse
                            ${
                              selected
                                ? "bg-slate-100 dark:bg-slate-900 dark:text-white"
                                : "bg-white dark:bg-slate-800 dark:text-slate-300"
                            }
                         `}
                        type="button"
                      >
                        <span
                          className={`
                              "text-lg",
                              ${
                                selected
                                  ? " opacity-100"
                                  : "opacity-50 dark:opacity-100"
                              }
                        `}
                        ></span>
                        <Icon icon="heroicons:chevron-double-right-solid" />
                        <span> {item.title}</span>
                      </button>
                    )}
                  </Tab>
                ))}
              </Tab.List>
            </Card>
          </div>
          <div className="xl:col-span-9 lg:col-span-8 col-span-12">
            <Tab.Panels>
              <Tab.Panel>
                <Accordion items={items} />
              </Tab.Panel>
              <Tab.Panel>
                <Accordion items={items2} />
              </Tab.Panel>
            </Tab.Panels>
          </div>
        </div>
      </Tab.Group>
    </div>
  );
};

export default FaqPage;
