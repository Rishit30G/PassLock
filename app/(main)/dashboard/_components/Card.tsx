"use client";

import { CardContent, Card } from "@/components/ui/card";
import { ArrowRight, Copy } from "lucide-react";
import DialogComponent from "./DialogComponent";
import { useEffect, useState, useCallback } from "react";
import { getDetails } from "@/actions/password.action";
import { toast } from "sonner";
import CardSkeleton from "./CardSkeleton";
import { maskPassword } from "@/lib/utils";
import InfiniteScroll from "react-infinite-scroll-component";

const DashboardCards = ({
  userId,
  accountId,
  searchTerm,
}: {
  userId: string;
  accountId: string;
  searchTerm: string;
}) => {
  const [userCards, setUserCards] = useState([]);
  const [filteredItems, setFilteredItems] = useState(userCards);
  const [loading, setLoading] = useState<boolean>(false);
  const [openDialogId, setOpenDialogId] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const lowerCasedSearchTerm = searchTerm.toLowerCase();
    const filtered = userCards.filter((item) =>
      item?.orgName.toLowerCase().includes(lowerCasedSearchTerm)
    );
    setFilteredItems(filtered);
  }, [searchTerm, userCards]);

  const fetchDetails = useCallback(async () => {
    setLoading(true);
    try {
      const details = await getDetails({ length: 0 });
      setUserCards(details.result);
      setHasMore(details.result.length > 0);
    } catch (error: any) {
      console.log(error?.message);
      toast.error("Failed to fetch details");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMoreData = async () => {
    setLoading(true);
    try {
      const details = await getDetails({ length: userCards.length });
      setUserCards((prev) => [...prev, ...details.result]);
      if (details.result.length === 0) {
        setHasMore(false);
      }
    } catch (error: any) {
      console.log(error?.message);
      toast.error("Failed to fetch more data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  const handleCopy = (text: string) => {
    try {
      navigator.clipboard.writeText(text);
      toast.success("Password copied!");
    } catch (error) {
      toast.error("Failed to copy password");
    }
  };

  return (
    <>
      {filteredItems.length === 0 && !loading && (
        <div className="flex justify-center py-10">
          <p className="text-xl poppins-light text-gray-500">
            Enter the details by clicking on 'Add New'
          </p>
        </div>
      )}

      {loading && <CardSkeleton />}

      <InfiniteScroll
        dataLength={filteredItems.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<CardSkeleton />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10 gap-x-10 gap-10">
          {filteredItems.map((item: any) => (
            <Card
              className="min-h-[180px] w-full rounded-lg border shadow-2xl shadow-blue-500/20 dark:shadow-blue-500/10 relative"
              key={item.$id}
            >
              <span className="absolute w-[40%] -top-px -left-px h-[2px] dark:h-[3px] bg-gradient-to-r from-blue-500/0 via-blue-500/40 to-blue-500/0 dark:from-blue-400/0 dark:via-blue-400/40 dark:to-blue-400/0"></span>
              <CardContent className="flex flex-col justify-between h-full p-5">
                <div className="flex justify-end mr-1">
                  <Copy
                    className="w-5 h-5 text-zinc-200 cursor-pointer dark:text-slate-600 hover:text-gray-300"
                    onClick={() => handleCopy(item?.password)}
                  />
                </div>
                <div className="flex items-center justify-between gap-5 w-full">
                  <div className="flex items-start flex-col gap-2">
                    <h1 className="text-xl poppins-light">{item?.orgName}</h1>
                    <p className="text-sm poppins-light">
                      {maskPassword(item?.password)}
                    </p>
                  </div>
                  <DialogComponent
                    text="Edit details"
                    userId={userId}
                    accountId={accountId}
                    item={item}
                    isOpen={openDialogId === item.$id}
                    onOpenChange={(open) =>
                      setOpenDialogId(open ? item.$id : null)
                    }
                    onSuccessfulOperation={fetchDetails}
                  >
                    <div
                      className="flex items-center justify-center w-8 h-8 rounded-full bg-black dark:bg-white"
                      onClick={() => setOpenDialogId(item.$id)}
                    >
                      <ArrowRight className="w-5 h-5 text-white dark:text-black cursor-pointer" />
                    </div>
                  </DialogComponent>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default DashboardCards;
