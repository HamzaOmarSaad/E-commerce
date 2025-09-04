import React from "react";
import CategoryProducts from "@/app/_components/shared/categoryProducts";

interface Props {
  params: {
    id: string;
  };
}

async function Page(props: Props) {
  const { params } = props;
  const id = await params.id;


  return (
      <CategoryProducts categoryId={id} />

  );
}

export default Page;
