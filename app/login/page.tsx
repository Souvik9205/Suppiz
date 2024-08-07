"use client";
import * as React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import {
  LaptopIcon,
  MobileIcon,
  GearIcon,
  BarChartIcon,
  DesktopIcon,
  Pencil1Icon,
  PersonIcon,
  GroupIcon,
  FileTextIcon,
  QuestionMarkIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().nonempty("Name is required"),
  age: z.string().nonempty("Age is required"),
  country: z.string().nonempty("Country is required"),
  city: z.string().optional(),
  occupation: z.string().nonempty("Occupation is required"),
  status: z.string().nonempty("Status is required"),
  organization: z.string().optional(),
  teamStrength: z.string().optional(),
});

function page() {
  const { toast } = useToast();
  const [term, setTerm] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    age: "",
    country: "",
    city: "",
    occupation: "",
    status: "",
    organization: "",
    teamStrength: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
  };
  const handleChangeTerms = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.checked);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      formSchema.parse(formData);
      if (!term) {
        toast({
          title: "Suppiz.com",
          description: "You must accept the terms and conditions",
        });
        return;
      }
      console.log(formData);
      toast({ title: "Suppiz.com", description: "User data has been saved!" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Suppiz.com",
          description: error.errors.map((err) => err.message).join(", "),
        });
      }
    }
  };

  return (
    <div className="m-2 flex h-[85vh]">
      <div className="h-full flex-1">
        <div className="h-full bg-stone-500">1</div>
      </div>
      <div className="h-full flex-1">
        <div className="p-16">
          <div>
            <div className="font-mono text-2xl font-semibold"></div>
            <div className="pt-2 text-4xl font-bold text-indigo-600">
              Please finish User Details To continue
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="w-full pt-16">
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger
                    value="personal"
                    className="font-mono text-xl font-bold"
                  >
                    Personal Details
                  </TabsTrigger>
                  <TabsTrigger
                    value="other"
                    className="font-mono text-xl font-bold"
                  >
                    Other Details
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="personal">
                  <Card>
                    <CardContent className="pt-5">
                      <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            placeholder={
                              formData.name ? formData.name : "Enter Your name"
                            }
                            value={formData.name}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="age">Age Group</Label>
                          <Select
                            onValueChange={(value) =>
                              setFormData({ ...formData, age: value })
                            }
                          >
                            <SelectTrigger id="age">
                              <SelectValue
                                placeholder={
                                  formData.age ? formData.age : "Select"
                                }
                              />
                            </SelectTrigger>
                            <SelectContent position="item-aligned">
                              <SelectItem value="18">
                                Lower Than 18 👦
                              </SelectItem>
                              <SelectItem value="18+">18 - 22 👨</SelectItem>
                              <SelectItem value="22+">22 - 30 🧔‍♂️</SelectItem>
                              <SelectItem value="30+">
                                Higher Than 30 👨‍🦳
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="country">Country</Label>
                          <Input
                            id="country"
                            value={formData.country}
                            onChange={handleChange}
                            placeholder={
                              formData.country
                                ? formData.country
                                : "Enter Your country name"
                            }
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            placeholder={
                              formData.city
                                ? formData.city
                                : "Enter Your city name"
                            }
                            value={formData.city}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="other">
                  <Card>
                    <CardContent className="pt-5">
                      <form>
                        <div className="grid w-full items-center gap-4">
                          <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="occupation">Occupation</Label>
                            <Select
                              onValueChange={(value) =>
                                setFormData({ ...formData, occupation: value })
                              }
                            >
                              <SelectTrigger id="occupation">
                                <SelectValue
                                  placeholder={
                                    formData.occupation
                                      ? formData.occupation
                                      : "Select"
                                  }
                                />
                              </SelectTrigger>
                              <SelectContent position="item-aligned">
                                <SelectItem value="web_dev">
                                  <span
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <LaptopIcon
                                      style={{ marginRight: "8px" }}
                                    />{" "}
                                    Web Developer
                                  </span>
                                </SelectItem>
                                <SelectItem value="android_dev">
                                  <span
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <MobileIcon
                                      style={{ marginRight: "8px" }}
                                    />{" "}
                                    Android Developer
                                  </span>
                                </SelectItem>
                                <SelectItem value="dev_ops">
                                  <span
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <GearIcon style={{ marginRight: "8px" }} />{" "}
                                    DevOps Engineer
                                  </span>
                                </SelectItem>
                                <SelectItem value="data_sci">
                                  <span
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <BarChartIcon
                                      style={{ marginRight: "8px" }}
                                    />{" "}
                                    Data Scientist
                                  </span>
                                </SelectItem>
                                <SelectItem value="backend_dev">
                                  <span
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <DesktopIcon
                                      style={{ marginRight: "8px" }}
                                    />{" "}
                                    Backend Developer
                                  </span>
                                </SelectItem>
                                <SelectItem value="frontend_dev">
                                  <span
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Pencil1Icon
                                      style={{ marginRight: "8px" }}
                                    />{" "}
                                    Frontend Developer
                                  </span>
                                </SelectItem>
                                <SelectItem value="newbie">
                                  <span
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <PersonIcon
                                      style={{ marginRight: "8px" }}
                                    />{" "}
                                    Newbie
                                  </span>
                                </SelectItem>
                                <SelectItem value="businessman">
                                  <span
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <FileTextIcon
                                      style={{ marginRight: "8px" }}
                                    />{" "}
                                    Businessman
                                  </span>
                                </SelectItem>
                                <SelectItem value="others">
                                  <span
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <QuestionMarkIcon
                                      style={{ marginRight: "8px" }}
                                    />{" "}
                                    Others
                                  </span>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="flex w-full flex-col space-y-1.5">
                            <Label htmlFor="status">Status</Label>
                            <RadioGroup
                              // defaultValue="developer"
                              onValueChange={(value) =>
                                setFormData({
                                  ...formData,
                                  status: value,
                                })
                              }
                              id="status"
                              className="w-full py-2"
                            >
                              <div className="flex w-full justify-around">
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="developer" id="r1" />
                                  <Label
                                    htmlFor="r1"
                                    className="text-center font-mono text-lg font-semibold"
                                  >
                                    💀 Developer
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="client" id="r2" />
                                  <Label
                                    htmlFor="r2"
                                    className="text-center font-mono text-lg font-semibold"
                                  >
                                    🤡 Client
                                  </Label>
                                </div>
                              </div>
                            </RadioGroup>
                          </div>

                          <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="city">Organization</Label>
                            <Input
                              id="organization"
                              value={formData.organization}
                              onChange={handleChange}
                              placeholder={
                                formData.organization
                                  ? formData.organization
                                  : "If Solo, say NA"
                              }
                            />
                          </div>
                          <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="team-strength">Team Strength</Label>
                            <Select
                              onValueChange={(value) =>
                                setFormData({
                                  ...formData,
                                  teamStrength: value,
                                })
                              }
                            >
                              <SelectTrigger id="team-strength">
                                <SelectValue
                                  placeholder={
                                    formData.teamStrength
                                      ? formData.teamStrength
                                      : "Select teammate numbers"
                                  }
                                />
                              </SelectTrigger>
                              <SelectContent position="item-aligned">
                                <SelectItem value="1">
                                  <span
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "8px",
                                    }}
                                  >
                                    <PersonIcon /> 1
                                  </span>
                                </SelectItem>
                                <SelectItem value="small team">
                                  <span
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "8px",
                                    }}
                                  >
                                    <GroupIcon /> 2-5
                                  </span>
                                </SelectItem>
                                <SelectItem value="mid team">
                                  <span
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "8px",
                                    }}
                                  >
                                    <GearIcon /> 5-15
                                  </span>
                                </SelectItem>
                                <SelectItem value="bigger">
                                  <span
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "8px",
                                    }}
                                  >
                                    <FileTextIcon /> 15+
                                  </span>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            <div className="flex items-center space-x-2 pt-4">
              <input
                type="checkbox"
                id="terms"
                onChange={handleChangeTerms}
                checked={term}
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Accept terms and conditions
              </label>
            </div>
            <div className="m-4 flex w-full justify-end pt-4">
              <Button type="submit" className="mx-4 p-6">
                Save Details
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default page;
