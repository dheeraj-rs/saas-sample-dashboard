import * as React from "react"
import EventDashboardLayout from "../../layout"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { IconCheck, IconClock, IconSettings, IconShieldCheck } from "@tabler/icons-react"
import { toast } from "sonner"
import configData from "../../data/registraction-config.json"

interface ConfigOption {
    key: string
    label: string
    value: boolean | string
    description?: string
}

interface ConfigSection {
    key: string
    title: string
    type: "radio" | "checkbox" | "time" | "checkbox-card"
    options: ConfigOption[]
}

interface RegistrationConfig {
    sections: ConfigSection[]
}

export default function RegistrationPage() {
    const config = configData as RegistrationConfig
    const [formData, setFormData] = React.useState<Record<string, any>>({})

    const getInitialData = () => {
        const initialData: Record<string, any> = {}
        config.sections.forEach(section => {
            if (section.type === "radio") {
                const selectedOption = section.options.find(opt => opt.value === true)
                if (selectedOption) {
                    initialData[section.key] = selectedOption.key
                }
            } else if (section.type === "checkbox" || section.type === "checkbox-card") {
                section.options.forEach(opt => {
                    initialData[`${section.key}_${opt.key}`] = opt.value
                })
            } else if (section.type === "time") {
                const timeOption = section.options[0]
                if (timeOption) {
                    initialData[section.key] = timeOption.value
                }
            }
        })
        return initialData
    }

    React.useEffect(() => {
        setFormData(getInitialData())
    }, [])

    const handleRadioChange = (sectionKey: string, optionKey: string) => {
        setFormData(prev => ({ ...prev, [sectionKey]: optionKey }))
    }

    const handleCheckboxChange = (sectionKey: string, optionKey: string, checked: boolean) => {
        setFormData(prev => ({ ...prev, [`${sectionKey}_${optionKey}`]: checked }))
    }

    const handleTimeChange = (sectionKey: string, value: string) => {
        setFormData(prev => ({ ...prev, [sectionKey]: value }))
    }

    const handleSave = () => {
        console.log("Saving configuration:", formData)
        toast.success("Configuration saved successfully")
    }

    const handleReset = () => {
        setFormData(getInitialData())
        toast.info("Configuration reset to defaults")
    }

    return (
        <EventDashboardLayout>
            <div className="flex flex-1 flex-col">
                <div className="flex flex-1 flex-col">
                    <div className="flex-1 overflow-auto">
                        <div className="py-6 px-6 space-y-8">
                            <section className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-lg font-semibold">Registration Flow</h2>
                                        <p className="text-sm text-muted-foreground">
                                            Control the order and requirements for your registration process
                                        </p>
                                    </div>
                                    <Button variant="outline" size="sm" onClick={handleReset}>
                                        <IconSettings className="mr-2 h-4 w-4" />
                                        Reset
                                    </Button>
                                </div>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-base">Flow Order</CardTitle>
                                            <CardDescription>Choose the registration sequence</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <RadioGroup
                                                value={formData.flowOrder}
                                                onValueChange={(value) => handleRadioChange("flowOrder", value)}
                                            >
                                                <div className="space-y-3">
                                                    {config.sections[0].options.map(option => (
                                                        <div key={option.key} className="flex items-center space-x-3">
                                                            <RadioGroupItem value={option.key} id={`flowOrder_${option.key}`} />
                                                            <Label htmlFor={`flowOrder_${option.key}`} className="font-normal cursor-pointer">
                                                                {option.label}
                                                            </Label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </RadioGroup>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-base">Registration Mode</CardTitle>
                                            <CardDescription>Set registration requirements</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <RadioGroup
                                                value={formData.registrationMode}
                                                onValueChange={(value) => handleRadioChange("registrationMode", value)}
                                            >
                                                <div className="space-y-3">
                                                    {config.sections[1].options.map(option => (
                                                        <div key={option.key} className="flex items-center space-x-3">
                                                            <RadioGroupItem value={option.key} id={`registrationMode_${option.key}`} />
                                                            <Label htmlFor={`registrationMode_${option.key}`} className="font-normal cursor-pointer">
                                                                {option.label}
                                                            </Label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </RadioGroup>
                                        </CardContent>
                                    </Card>
                                </div>
                            </section>
                            <Separator />
                            <section className="space-y-4">
                                <div>
                                    <h2 className="text-lg font-semibold">Identity & Checkout</h2>
                                    <p className="text-sm text-muted-foreground">
                                        Configure identity verification and checkout experience
                                    </p>
                                </div>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-base">Primary Identity</CardTitle>
                                            <CardDescription>Choose primary contact method</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <RadioGroup
                                                value={formData.primaryIdentity}
                                                onValueChange={(value) => handleRadioChange("primaryIdentity", value)}
                                            >
                                                <div className="space-y-3">
                                                    {config.sections[2].options.map(option => (
                                                        <div key={option.key} className="flex items-center space-x-3">
                                                            <RadioGroupItem value={option.key} id={`primaryIdentity_${option.key}`} />
                                                            <Label htmlFor={`primaryIdentity_${option.key}`} className="font-normal cursor-pointer">
                                                                {option.label}
                                                            </Label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </RadioGroup>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-base">Checkout Settings</CardTitle>
                                            <CardDescription>Customize checkout experience</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                {config.sections[3].options.map(option => (
                                                    <div key={option.key} className="flex items-start space-x-3">
                                                        <Checkbox
                                                            id={`checkoutSettings_${option.key}`}
                                                            checked={formData[`checkoutSettings_${option.key}`] || false}
                                                            onCheckedChange={(checked) =>
                                                                handleCheckboxChange("checkoutSettings", option.key, checked as boolean)
                                                            }
                                                        />
                                                        <div className="grid gap-1.5 leading-none">
                                                            <Label htmlFor={`checkoutSettings_${option.key}`} className="font-normal cursor-pointer">
                                                                {option.label}
                                                            </Label>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </section>
                            <Separator />
                            <section className="space-y-4">
                                <div>
                                    <h2 className="text-lg font-semibold">Session & Security</h2>
                                    <p className="text-sm text-muted-foreground">
                                        Manage session timeouts and security settings
                                    </p>
                                </div>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-base flex items-center gap-2">
                                                <IconClock className="h-4 w-4" />
                                                Session Timeout
                                            </CardTitle>
                                            <CardDescription>Set maximum session duration</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-2">
                                                <Label htmlFor="sessionTimeout_duration">Duration (HH:MM:SS)</Label>
                                                <Input
                                                    id="sessionTimeout_duration"
                                                    type="time"
                                                    step="1"
                                                    value={formData.sessionTimeout || "00:15:00"}
                                                    onChange={(e) => handleTimeChange("sessionTimeout", e.target.value)}
                                                    className="w-full"
                                                />
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-base flex items-center gap-2">
                                                <IconShieldCheck className="h-4 w-4" />
                                                Additional Settings
                                            </CardTitle>
                                            <CardDescription>Extra security and features</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                {config.sections[6].options.map(option => (
                                                    <div key={option.key} className="flex items-start space-x-3">
                                                        <Checkbox
                                                            id={`additionalSettings_${option.key}`}
                                                            checked={formData[`additionalSettings_${option.key}`] || false}
                                                            onCheckedChange={(checked) =>
                                                                handleCheckboxChange("additionalSettings", option.key, checked as boolean)
                                                            }
                                                        />
                                                        <div className="grid gap-1.5 leading-none">
                                                            <Label htmlFor={`additionalSettings_${option.key}`} className="font-normal cursor-pointer">
                                                                {option.label}
                                                            </Label>
                                                            {option.description && (
                                                                <p className="text-xs text-muted-foreground">
                                                                    {option.description}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </section>

                            <Separator />

                            <section className="space-y-4">
                                <div>
                                    <h2 className="text-lg font-semibold">Ticket Form Behavior</h2>
                                    <p className="text-sm text-muted-foreground">
                                        Choose how attendee information is collected
                                    </p>
                                </div>
                                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                    {config.sections[5].options.map(option => (
                                        <Card
                                            key={option.key}
                                            className={`cursor-pointer transition-all hover:shadow-md ${formData[`ticketFormBehavior_${option.key}`]
                                                ? "border-primary shadow-sm"
                                                : ""
                                                }`}
                                            onClick={() =>
                                                handleCheckboxChange(
                                                    "ticketFormBehavior",
                                                    option.key,
                                                    !formData[`ticketFormBehavior_${option.key}`]
                                                )
                                            }
                                        >
                                            <CardHeader className="pb-3">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <CardTitle className="text-sm font-medium">
                                                            {option.label}
                                                        </CardTitle>
                                                        <CardDescription className="mt-1.5 text-xs">
                                                            {option.description}
                                                        </CardDescription>
                                                    </div>
                                                    <Checkbox
                                                        checked={formData[`ticketFormBehavior_${option.key}`] || false}
                                                        onCheckedChange={(checked) =>
                                                            handleCheckboxChange("ticketFormBehavior", option.key, checked as boolean)
                                                        }
                                                        onClick={(e) => e.stopPropagation()}
                                                    />
                                                </div>
                                            </CardHeader>
                                        </Card>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>
                    <div className="border-t bg-background">
                        <div className="flex items-center justify-between p-4">
                            <p className="text-sm text-muted-foreground">
                                Changes are saved automatically
                            </p>
                            <div className="flex gap-2">
                                <Button variant="outline">Cancel</Button>
                                <Button onClick={handleSave}>
                                    <IconCheck className="mr-2 h-4 w-4" />
                                    Save Configuration
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </EventDashboardLayout>
    )
}
