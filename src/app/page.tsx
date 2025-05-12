import { HomePage } from "@/pages/Home/page";
import { Container } from "../common/components/Container/container";
import { fetchCharacters } from "@/services/characters.service";

export default async function Home() {
  const characters = await fetchCharacters(1);

  return (
    <Container>
      <HomePage initialCharacters={characters} />
    </Container>
  );
}
