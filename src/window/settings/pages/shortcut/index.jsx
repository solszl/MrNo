import { Separator } from "@/components/ui/separator";
import { columns } from "../../components/shortcut-table/columns";
import ShortcutTable from "../../components/shortcut-table/data-table";

const Shortcut = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Shortcut</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <ShortcutTable data={[]} columns={columns} />
    </div>
  );
};

export default Shortcut;
