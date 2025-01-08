"use client";

import { CardContent, Card } from "@/components/ui/card";
import { ArrowRight, Copy, Search, X } from "lucide-react";
import DialogComponent from "./DialogComponent";
import { useEffect, useState, useCallback } from "react";
import { getDetails, getSearchDetails } from "@/actions/password.action";
import { toast } from "sonner";
import CardSkeleton from "./CardSkeleton";
import { handleCopy, maskPassword, sortByOrgName } from "@/lib/utils";
import InfiniteScroll from "react-infinite-scroll-component";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface UserCard {
  orgName: string;
}

const DashboardCards = ({
  userId,
  accountId,
}: {
  userId: string;
  accountId: string;
}) => {
  const [userCards, setUserCards] = useState<UserCard[]>([]);
  const [openDialogId, setOpenDialogId] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [dialogState, setDialogState] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);

  const fetchDetails = useCallback(async () => {
    setLoading(true);
    try {
      const details = await getDetails({ length: 0 });
      if (typeof details === "object" && "error" in details) {
        toast.error(details.error);
        return;
      }
      setUserCards(details.result);
      setHasMore(details.result.length > 0);
    } catch (error) {
      toast.error((error as Error)?.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMoreData = useCallback(async () => {
      const details =  await getDetails({ length: userCards.length });
      setUserCards((prev) => [...prev, ...details.result]);
      if (details.result.length === 0) {
        setHasMore(false);
      }
  }, [userCards.length, setUserCards, setHasMore]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      return;
    }
    setSearching(true);
    setLoading(true);
    try {
      const details = await getSearchDetails(searchTerm.trim());
      if (typeof details === "object" && "error" in details) {
        toast.error(details.error);
        return;
      }
      const sortedResults = sortByOrgName(details.result || []);
      setUserCards(sortedResults);
      setHasMore(false);
    } catch (error) {
      toast.error((error as Error)?.message || "Failed to search data");
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = async () => {
    setSearchTerm("");
    setSearching(false);
    await fetchDetails();
  };

  return (
    <>
      <div className="container max-w-7xl mx-auto min-h-screen pt-20 max-2xl:px-4 ">
        <div className="flex items-center justify-between max-md:justify-center gap-5 lg:mx-8">
          <h2 className="text-xl poppins-light max-md:hidden">Password List</h2>
          <div className="flex items-center gap-5">
            <div className="relative w-[280px] max-lg:max-w-[230px]">
              <Button
                variant="outline"
                onClick={searching ? handleClearSearch : handleSearch}
                className="absolute right-0 top-0  cursor-pointer border dark:bg-gray-500/20 bg-white dark:hover:bg-gray-500/40 hover:bg-gray-100/30"
                aria-label={searching ? "Clear search" : "Search"}
              >
                {searching ? (
                  <X className="dark:text-white text-gray-500" /> // Cross Icon
                ) : (
                  <Search className="dark:text-white text-gray-500" /> // Search Icon
                )}
              </Button>
              <Input
                placeholder="Search"
                className="pr-16 w-full focus-visible:ring-1 focus-visible:ring-gray-500 focus-visible:ring-opacity-60"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && searchTerm.trim() && handleSearch()
                }
              />
            </div>
            <DialogComponent
              text="Add details"
              userId={userId}
              accountId={accountId}
              isOpen={dialogState}
              onOpenChange={setDialogState}
            >
              <Button
                className="inline-flex animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-4 font-medium text-white transition-colors"
                onClick={() => setDialogState(true)}
              >
                Add New
              </Button>
            </DialogComponent>
          </div>
        </div>
        {loading ? (
          <div className="py-10">
            <CardSkeleton />
          </div>
        ) : userCards.length === 0 && !loading && !searching ? (
          <p className="text-center poppins-regular py-40 text-gray-400 text-3xl">Nothing Here 🔐</p>
        ) : (
          <InfiniteScroll
            dataLength={userCards.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<CardSkeleton />}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10 gap-x-10 gap-10 lg:mx-8 mb-10">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {userCards.map((item: any) => (
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
                        <h1 className="text-xl poppins-light">
                          {item?.orgName}
                        </h1>
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
                        <Button
                          className="flex items-center justify-center w-8 h-8 rounded-full bg-black dark:bg-white"
                          onClick={() => setOpenDialogId(item.$id)}
                        >
                          <ArrowRight className="w-5 h-5 text-white dark:text-black cursor-pointer" //add aria label
                             aria-label="Edit details"
                          />
                        </Button>
                      </DialogComponent>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </InfiniteScroll>
        )}
      </div>
    </>
  );
};

export default DashboardCards;
