import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import api from "@/lib/interceptor"
import { getBranchDetails, getStoreDetail } from "@/redux/features/store/store"
import { Branch } from "@/redux/features/store/types"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { Building, Edit, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { toast } from "sonner"

interface BranchCardTypes {
  branch: Branch,
}

const BranchCard = ({ branch }: BranchCardTypes) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { storeDetailData, branchDetailsData } = useAppSelector((s) => s.store);

  const handleBranchEdit = (b_id: number, s_id: number) => {
    toast("Navigated to edit branch")
    dispatch(getBranchDetails({ store_id: s_id, branch_id: b_id }))
    console.log("id", b_id)
  }

  const handleBranchDelete = async (b_id: number, s_id: number) => {
    await api.delete(`/api/stores/${s_id}/branches/${b_id}/`)
    console.log("Successfully deleted")
    dispatch(getStoreDetail(s_id))
  }

  useEffect(() => {
    if (branchDetailsData) {
      router.push('/dashboard/create_branch/?action=edit')
    }
  }, [branchDetailsData])

  return (
    <Card >
      <CardContent className="px-4,py-2">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4 text-primary" />
              <span className="font-medium text-card-foreground">
                {branch.name}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              {branch.address}, {branch.city}
            </div>
          </div>
          {storeDetailData && (
            <div className="flex gap-1">
              <Button
                onClick={() => handleBranchEdit(branch.id, storeDetailData.id)}
                variant="ghost"
                size="icon"
              >
                <Edit />
              </Button>
              <Button
                onClick={() => handleBranchDelete(branch.id, storeDetailData.id)}
                variant="destructive"
                size="icon"
              >
                <Trash2 />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
export default BranchCard;
