import { generateUUID } from '@/utils/generateFakeUuid';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const data = [
    {
      title: 'Nano S',
      img: '/nano-s.png',
    },
    {
      title: 'Nano S Plus',
      img: '/nano-s-plus.png',
    },
    {
      title: 'Nano X',
      img: '/nano-x.png',
    },
    {
      title: 'Stax',
      img: '/stax.png',
    },
    {
      title: 'Flex',
      img: '/flex.png',
    },
  ];

  return (
    <div className="bg-gray mt-5 space-y-20 rounded-xl p-5 py-28">
      <h1 className="text-center text-3xl">Select your device</h1>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((item, index) => {
          return (
            <Link
              href={`/2dt/${generateUUID()}`}
              key={index}
              className="bg-box group relative flex cursor-pointer flex-col items-center gap-y-3 rounded px-4 py-8"
            >
              <p className="mb-4 text-xl font-medium">{item.title}</p>
              {item.img && (
                <div className="relative h-44 w-40">
                  <Image
                    src={item.img}
                    alt={item.title}
                    className="object-contain transition-transform duration-100 ease-linear group-hover:scale-110"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
