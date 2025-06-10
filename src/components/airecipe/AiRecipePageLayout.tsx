import Header from "@/components/layout/header/Header";
import Loading from "@/components/ui/loading";
import { ReactNode } from "react";

interface Props {
  loading: boolean;
  error: Error | null;
  children: ReactNode;
}

const AiRecipePageLayout = ({ loading, error, children }: Props) => {
  if (loading) {
    return (
      <>
        <Header />
        <Loading className="w-full h-screen flex justify-center items-center" />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <div className="text-red-500">에러가 발생했습니다: {error.message}</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default AiRecipePageLayout;
