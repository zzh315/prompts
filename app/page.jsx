import Feed from "@components/Feed";
import Image from "next/image";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br />
        <span className="orange_gradient text-center">Ai-Powered Prompts</span>
      </h1>
      <p className="desc text-center ">
        OnlyPrompts is an AI prompting tool for developers to discover, create
        and share creative prompts
      </p>
      <Feed />

      <div className="flex justify-center mt-20">
        <a
          href="https://github.com/zzh315/prompts"
          target="_blank"
          title="zzh315Github"
        >
          <Image
            src="/assets/images/github-mark.svg"
            alt="github"
            width={30}
            height={30}
          />
        </a>
      </div>
    </section>
  );
};
export default Home;
