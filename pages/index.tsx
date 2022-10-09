import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

if (typeof window === "undefined") { 
  console.log("In server")
  console.log("Hi")
 }

const App = dynamic(
  () => {
    return import('./App');
  },
  { ssr: false }
);

const Home: NextPage = () => {
  return <App />;
};

export default Home;
