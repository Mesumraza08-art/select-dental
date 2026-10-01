import { socialVideos } from "@/content/social";
import { site } from "@/content/site";
import { img } from "@/content/media";
import { vids } from "@/content/videos";
import { Lines, Eyebrow } from "@/components/ui/Lines";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Pending } from "@/components/ui/Pending";
import { DragTrack } from "@/components/ui/DragTrack";
import { SocialCard, type SocialCardData } from "@/components/social/SocialCard";

export function BehindTheSmile() {
  const cards: SocialCardData[] = socialVideos
    .map((v): SocialCardData | null => {
      if (v.src) return { id: v.id, title: v.title, topic: v.topic, platform: v.platform, url: v.url, poster: v.poster ? { src: v.poster } : null, video: v.src };
      if (site.preview && v.sample) {
        const p = img[v.sample.poster];
        return { id: v.id, title: v.title, topic: v.topic, platform: v.platform, url: null, poster: { src: p.src, blur: p.blur }, video: v.sample.video ? vids[v.sample.video].srcMobile : null, sample: true };
      }
      return null;
    })
    .filter((c): c is SocialCardData => c !== null);
  const { instagram, tiktok } = site.social;
  if (!cards.length && !instagram && !tiktok) return null;
  return (
    <section className="section overflow-hidden bg-mist" aria-labelledby="social-title">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow n="06">Social</Eyebrow>
            <Lines id="social-title" className="t-mega mt-6" lines={["Behind", "the smile."]} />
          </div>
          <div className="lg:col-span-5" data-anim="fade">
            <p className="body-copy">Tips, stories and everyday moments from Select Dental.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {instagram ? (
                <ButtonLink href={instagram} variant="secondary" size="sm" track="instagram_click">
                  <Icon name="instagram" className="size-[18px]" /> Instagram
                </ButtonLink>
              ) : (
                <Pending>Instagram link</Pending>
              )}
              {tiktok ? (
                <ButtonLink href={tiktok} variant="secondary" size="sm" track="tiktok_click">
                  <Icon name="tiktok" className="size-[18px]" /> TikTok
                </ButtonLink>
              ) : (
                <Pending>TikTok link</Pending>
              )}
            </div>
          </div>
        </div>
        {cards.length > 0 && (
          <div className="mt-14" data-anim="fade">
            <DragTrack label="Videos from Select Dental" itemClass="w-[64%] xs:w-[52%] sm:w-[34%] lg:w-[calc((min(100vw,1360px)-2*var(--pad))/4.6)] [&:nth-child(even)]:pt-10" gap="gap-5">
              {cards.map((c) => (
                <SocialCard key={c.id} d={c} />
              ))}
            </DragTrack>
          </div>
        )}
      </div>
    </section>
  );
}
