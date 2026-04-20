import { createFileRoute } from "@tanstack/react-router";
import type { Id } from "@convex/_generated/dataModel";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { UserReviewList } from "@/components/profile/UserReviewList";
import { UserStoreList } from "@/components/profile/UserStoreList";
import { useUserProfile } from "@/hooks/useUserProfile";

function UserProfilePage() {
  const { id } = Route.useParams();
  const userId = id as Id<"users">;
  const { user, reviewRows, storeRows, reviewCount, storeCount, isLoading } =
    useUserProfile(userId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh] font-mono uppercase tracking-widest text-sm">
        Chargement…
      </div>
    );
  }
  if (!user) {
    return <div className="font-bold text-2xl uppercase">User not found</div>;
  }

  return (
    <div className="space-y-12">
      <ProfileHeader
        handle={user.handle}
        avatarUrl={user.avatarUrl}
        joinedAt={user._creationTime}
        reviewCount={reviewCount}
        storeCount={storeCount}
      />
      <div className="grid md:grid-cols-2 gap-12">
        <UserReviewList handle={user.handle} reviews={reviewRows} />
        <UserStoreList stores={storeRows} />
      </div>
    </div>
  );
}

export const Route = createFileRoute("/profile/$id")({
  component: UserProfilePage,
});
