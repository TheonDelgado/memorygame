'use client'

import Card from "@/components/Card";
import { useEffect, useState } from "react";

export default function Home() {

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [pokemon, setPokemon] = useState([]);
  const [clickedPokemon, setClickedPokemon] = useState([]);

  fetch('https://fakestoreapi.com/products?limit=5')
            .then(res=>res.json())
            .then(json=>console.log(json))

  function shuffle(array: any) {

    let currentIndex = array.length;

    while (currentIndex != 0) {

      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }


  const onHandleClick = (name: never) => {
    setPokemon((prevPokemon) => shuffle([...prevPokemon]));
    if (clickedPokemon.includes(name)) {
      setClickedPokemon([]);
      setScore(0);
    } else {
      setClickedPokemon([...clickedPokemon, name]);
      setScore(score + 1);
      if (score + 1 > highScore) {
        setHighScore(score + 1);
      }
    }
  };

  useEffect(() => {
    let temp = new Set();
    while (temp.size < 9) {
      const randomNum = Math.floor(Math.random() * 20 + 1);
      temp.add(randomNum);
    }
    const urls = Array.from(temp).map(
      (randomNum) => `https://pokeapi.co/api/v2/pokemon/${randomNum}`
    );
    const fetchPromises = urls.map((url) => fetch(`${url}`));

    Promise.all(fetchPromises)
      .then((responses) =>
        Promise.all(responses.map((response) => response.json()))
      )
      .then((data: any) => {
        setPokemon(
          data.map((poke: any) => {
            return { name: poke.name, sprite: poke.sprites.front_default };
          })
        );
      });
  }, [])

  return (
    <div>
      <h1>Welcome to the Pokemon Memory Game!</h1>
      <p>Get points by clicking on the pokemon, but don't click more than one in a row!</p>
      <p>Best Score: {highScore}</p>
      <p>Current Score: {score}</p>
      <div className="flex flex-row">
        {pokemon.map((poke: any, index) => (
          <Card
            key={index}
            name={poke.name}
            sprite={poke.sprite}
            onClick={() => {
              onHandleClick(poke.name as never);
            }}
          />
        ))}
      </div>
    </div>
  );
}
