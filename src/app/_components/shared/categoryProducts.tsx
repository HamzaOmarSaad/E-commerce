import { getSpecificCategories } from '@/services/categories';
import Link from 'next/link';
import React from 'react'
import ProductCard from '../productCard';
import { Iproduct } from '@/types/product.type';

interface Props {
    categoryId:string
}

async function CategoryProducts(props: Props) {
    const { categoryId } = props;
    const data = await getSpecificCategories(categoryId);

    return (
      <div className="products container mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data?.data?.map((p: Iproduct) => (
          <Link href={`/productDetails/${p.id}`} key={p.id}>
            <ProductCard product={p} />
          </Link>
        ))}
          </div>
    );
}

export default CategoryProducts
