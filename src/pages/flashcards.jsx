import React from "react";
import { FlashcardArray } from "react-quizlet-flashcard";
import Layout from "../components/Layout";
import Flashcard from "../components/Flashcard";

const cards = [
        {
          id: 1,
          front: "What is the capital of <u>Alaska</u>?",
          back: "Juneau",
          frontChild: <div>Hello there</div>,
          backChild: <p>This is a back child</p>,
        },
        {
          id: 2,
          front: "What is the capital of California?",
          back: "Sacramento",
        },
        {
          id: 3,
          front: "What is the capital of New York?",
          back: "Albany",
        },
        {
          id: 4,
          front: "What is the capital of Florida?",
          back: "Tallahassee",
        },
        {
          id: 5,
          front: "What is the capital of Texas?",
          back: "Austin",
        },
        {
          id: 6,
          front: "What is the capital of New Mexico?",
          back: "Santa Fe",
        },
        {
          id: 7,
          front: "What is the capital of Arizona?",
          back: "Phoenix",
        },
      ];

      const FlashcardsPage = () => {
        return (
          <Layout>
            <section className="container mx-auto mt-10 px-4">
              <h2 className="text-2xl font-semibold mb-5">Flashcards</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cards.map((card) => (
                  <Flashcard key={card.id} front={card.front} back={card.back} />
                ))}
              </div>
            </section>
          </Layout>
        );
      };
      

export default FlashcardsPage;
