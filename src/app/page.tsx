import { HomePage } from "@/pages/Home/home";
import { Container } from "./common/components/Container/container";
import { fetchCharacters } from "@/pages/Home/services/characters.service";

export default async function Home() {
  const characters = await fetchCharacters(1);

  return (
    <Container>
      <HomePage initialCharacters={characters} />
    </Container>
  );
}
