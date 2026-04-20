import { createFileRoute, Navigate } from "@tanstack/react-router";
import type { Id } from "@convex/_generated/dataModel";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { UserReviewList } from "@/components/profile/UserReviewList";
import { UserStoreList } from "@/components/profile/UserStoreList";
import { useMe } from "@/hooks/useMe";
import { useUserProfile } from "@/hooks/useUserProfile";

function MyProfilePage() {
  const { me, isLoading: meLoading } = useMe();

  if (meLoading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh] font-mono uppercase tracking-widest text-sm">
        Chargement…
      </div>
    );
  }
  if (!me) {
    return <Navigate to="/sign-in" />;
  }
  return <MyProfileInner userId={me._id} />;
}

function MyProfileInner({ userId }: { userId: Id<"users"> }) {
  const { user, reviewRows, storeRows, reviewCount, storeCount, isLoading } =
    useUserProfile(userId);

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[40vh] font-mono uppercase tracking-widest text-sm">
        Chargement…
      </div>
    );
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

export const Route = createFileRoute("/_authenticated/profile")({
  component: MyProfilePage,
});
