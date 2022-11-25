import { Button, Text, UniversalUIConfigContext } from "@parssa/universal-ui";

export default function Home() {
  return (
    <UniversalUIConfigContext.Provider value={{ components: {}, ssr: true }}>
      <main className="container pt-48 dark:bg-black">
        <Text>Hello World</Text>
        <Button>Hello World</Button>
        
      </main>
    </UniversalUIConfigContext.Provider>
  );
}
