import CreateAccountDrawer from "@/components/create-account-drawer";  // ✅ fixed
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import React from 'react';

function Dashboard () {
  return (
    <div className="px-5">
      {/* Budget Progress */}

      {/* Dashboard Overview */}

      {/* Account Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CreateAccountDrawer>
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed">
            <CardContent className="flex flex-col items-center justify-center text-muted-foreground h-full pt-5">
              <Plus className="h-6 w-6 mb-2" />
              <p className="text-sm font-medium">Add New Account</p>
            </CardContent>
          </Card>
        </CreateAccountDrawer>
      </div>
    </div>
  );
};

export default Dashboard;
