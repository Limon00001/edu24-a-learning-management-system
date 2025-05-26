/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 26 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// Internal Imports
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Component
const CourseSettings = () => {
  return (
    <Card className={'border-none'}>
      <CardHeader>
        <CardTitle>Course Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <Label>Upload Course Image</Label>
          <Input type="file" accept="image/*" className="mb-4" />
        </div>
      </CardContent>
    </Card>
  );
};

// Export
export default CourseSettings;
