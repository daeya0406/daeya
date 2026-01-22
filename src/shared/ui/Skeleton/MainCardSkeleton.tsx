import { Skeleton } from '@/shared/ui/Skeleton';

const MainCardSkeleton = () => {
  return (
    <div className="grid w-full grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="h-90 rounded-4xl relative w-full justify-end bg-gray-100">
          <div className="h-42.5 rounded-4xl absolute bottom-0 left-0 flex w-full flex-col gap-3 bg-white p-6 shadow-sm">
            <Skeleton.Row width="85%" height={22} className="rounded-full" />

            <div className="flex items-center gap-2">
              <Skeleton.Circle size={20} />
              <Skeleton.Row width="20%" height={16} className="rounded-full" />
            </div>

            <div className="mt-5">
              <Skeleton.Row width={80} height={24} className="rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainCardSkeleton;
