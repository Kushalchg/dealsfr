import { Button } from "@/components/ui/button"
import { Branch } from "@/redux/features/store/types"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import BranchCard from "./BranchCard"


const BranchSection = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { storeDetailData, branchDetailsData } = useAppSelector((s) => s.store);

  return (
    <div>
      {storeDetailData && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium text-card-foreground">
              Store Branches ({storeDetailData.branches?.length || 0})
            </h3>

            <Link href="/dashboard/create_branch">
              <Button variant="outline" size="sm" className="h-8">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Branch
              </Button>
            </Link>
          </div>

          {/*List of branches*/}
          <div className="grid grid-cols gap-4">
            {storeDetailData.branches?.map((branch) => (
              <div key={branch.id.toString()}>
                <BranchCard branch={branch} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
export default BranchSection;
