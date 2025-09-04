import { JSX, useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { toast } from "sonner"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { createSocialMedia, deleteSocialMedia, getSocialMediaList } from "@/redux/features/store/store"
import { clearSocialMediaCreateState } from "@/redux/features/store/storeSlice"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

import {
  FaTiktok,
  FaYoutube,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaWhatsapp,
  FaGlobe,
  FaQuestionCircle,
} from "react-icons/fa";
import { capitalize } from "@/lib/utils"
import { SocialMediaResp } from "@/redux/features/store/types"
import api from "@/lib/interceptor"

const ALL_PLATFORM = [
  "TWITTER",
  "FACEBOOK",
  "TIKTOK",
  "INSTAGRAM",
  "WHATSAPP",
  "LINKEDIN",
  "YOUTUBE",
  "WEBSITE",
  "OTHER"
];

const SOCIAL_MEDIA_MAP: Record<string, JSX.Element> = {
  TWITTER: <FaTwitter color="#1DA1F2" />,
  FACEBOOK: <FaFacebook color="#1877F2" />,
  TIKTOK: <FaTiktok className="text-foreground" />,
  INSTAGRAM: <FaInstagram color="#E4405F" />,
  WHATSAPP: <FaWhatsapp color="#25D366" />,
  LINKEDIN: <FaLinkedin color="#0A66C2" />,
  YOUTUBE: <FaYoutube color="#FF0000" />,
  WEBSITE: <FaGlobe color="#6B7280" />,
  OTHER: <FaQuestionCircle color="#9CA3AF" />
} as const;

export default function SocialMediaSection() {
  const dispatch = useAppDispatch()
  const { socialMediaData, socialMediaCreateData, socialMediaCreateError, storeDetailData } = useAppSelector((s) => s.store)

  const [socialModal, setSocialModal] = useState(false)
  const [platform, setPlatform] = useState("")
  const [url, setUrl] = useState("")

  // new states for delete dialog
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<SocialMediaResp | null>(null)

  const handleAddSocial = () => {
    if (platform.trim() === "" || url.trim() === "") {
      toast.warning("All fields are required (can't be empty).", { richColors: true })
      return
    }
    const payload = {
      platform: platform,
      url: url,
      alt_text: platform.toLowerCase()
    }
    storeDetailData && dispatch(createSocialMedia({ payload, s_id: storeDetailData.id }))
  }

  const handleDeleteSocial = async () => {
    if (!selectedItem || !storeDetailData) return
    try {
      console.log("delete", selectedItem)
      // Here call your redux deleteSocialMedia(selectedItem.id)
      dispatch(deleteSocialMedia({ s_id: storeDetailData.id, id: selectedItem.id }))

      setDeleteModal(false)
      setSelectedItem(null)
      toast.success(`${selectedItem.platform} deleted`, { richColors: true })
    } catch (err: any) {
      toast.error(` Error while ${selectedItem.platform} delete`, { richColors: true })
    }
  }

  useEffect(() => {
    storeDetailData && dispatch(getSocialMediaList(storeDetailData.id))
  }, [storeDetailData])

  useEffect(() => {
    if (socialMediaCreateData) {
      setSocialModal(false)
      toast.success("Successfully added.", { richColors: true })
      setPlatform("")
      setUrl("")
    }
    if (socialMediaCreateError) {
      toast.error(socialMediaCreateError, { richColors: true })
    }

    return () => {
      dispatch(clearSocialMediaCreateState())
    }
  }, [socialMediaCreateData, socialMediaCreateError])

  return (
    <>
      {/* Main Add Social Media Dialog */}
      <Dialog onOpenChange={setSocialModal} open={socialModal}>
        <div className="flex flex-wrap gap-6 items-center">
          <div className="flex flex-wrap gap-6">
            {socialMediaData && socialMediaData.map((item, index) => {
              return (
                <Tooltip key={index.toString()}>
                  <TooltipTrigger
                    className="bg-accent rounded-md p-2"
                    onClick={() => {
                      setSelectedItem(item)
                      setDeleteModal(true)
                    }}
                  >
                    {SOCIAL_MEDIA_MAP[item.platform]}
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{item.platform}</p>
                    <p>{item.url}</p>
                  </TooltipContent>
                </Tooltip>
              )
            })}
          </div>

          <DialogTrigger
            onClick={() => setSocialModal(true)}
            className="border p-1 rounded-lg border-dashed"
          >
            <Plus />
          </DialogTrigger>
        </div>

        <DialogContent className="text-foreground">
          <DialogHeader>
            <DialogTitle>Add Social Media Links</DialogTitle>
            <DialogDescription>
              Add your store social media links from where users can interact.
            </DialogDescription>

            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="platform">Social Media Platform</Label>
                <Select onValueChange={setPlatform} value={platform}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {socialMediaData &&
                      ALL_PLATFORM
                        .filter((pitem) =>
                          !socialMediaData?.map((item) => item.platform).includes(pitem)
                        )
                        .map((pitem) => (
                          <SelectItem value={pitem} key={pitem.toString()}>
                            {capitalize(pitem)}
                          </SelectItem>
                        ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="platform-url">Platform URL</Label>
                <Input
                  id="platform-url"
                  placeholder="https://thedealsfr.com/"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
            </div>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button type="submit" onClick={handleAddSocial}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Small Delete Dialog */}
      <Dialog onOpenChange={setDeleteModal} open={deleteModal}>
        <DialogContent className="w-full max-w-sm text-foreground">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {SOCIAL_MEDIA_MAP[selectedItem?.platform || "OTHER"]}
              <span>{selectedItem?.platform}</span>
            </DialogTitle>
            <DialogDescription
              className="break-all text-sm text-muted-foreground mt-2"
            >
              {selectedItem?.url}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleDeleteSocial}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
