"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Cpu, Zap, Globe, Terminal, ArrowRight, ArrowLeft, CheckCircle, Clock, Layers, Settings } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { useState } from "react"
import Link from "next/link"

export default function CreateInstancePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedConfig, setSelectedConfig] = useState("")
  const [selectedImage, setSelectedImage] = useState("")
  const [instanceName, setInstanceName] = useState("")
  const [selectedStorage, setSelectedStorage] = useState<string[]>([])
  const [enableWeb, setEnableWeb] = useState(true)
  const [enableSSH, setEnableSSH] = useState(true)

  const gpuConfigs = [
    {
      id: "rtx-3080",
      name: "RTX 3080",
      gpu: "RTX 3080 10GB",
      cpu: "8 vCPU",
      memory: "32GB RAM",
      storage: "200GB SSD",
      price: "1.80",
      popular: false,
      specs: ["10GB GDDR6X", "8,704 CUDA核心", "PCIe 4.0"],
    },
    {
      id: "rtx-4090",
      name: "RTX 4090",
      gpu: "RTX 4090 24GB",
      cpu: "12 vCPU",
      memory: "64GB RAM",
      storage: "500GB SSD",
      price: "2.50",
      popular: true,
      specs: ["24GB GDDR6X", "16,384 CUDA核心", "83 RT核心"],
    },
    {
      id: "a100-40gb",
      name: "A100 40GB",
      gpu: "A100 40GB",
      cpu: "16 vCPU",
      memory: "128GB RAM",
      storage: "1TB SSD",
      price: "3.20",
      popular: false,
      specs: ["40GB HBM2", "6,912 CUDA核心", "432 Tensor核心"],
    },
    {
      id: "a100-80gb",
      name: "A100 80GB",
      gpu: "A100 80GB",
      cpu: "20 vCPU",
      memory: "256GB RAM",
      storage: "2TB SSD",
      price: "4.20",
      popular: false,
      specs: ["80GB HBM2e", "6,912 CUDA核心", "Multi-Instance GPU"],
    },
    {
      id: "h100",
      name: "H100 SXM",
      gpu: "H100 80GB",
      cpu: "32 vCPU",
      memory: "512GB RAM",
      storage: "4TB SSD",
      price: "8.50",
      popular: false,
      specs: ["80GB HBM3", "14,592 CUDA核心", "Transformer Engine"],
    },
  ]

  const imageCategories = [
    {
      name: "深度学习框架",
      images: [
        {
          id: "pytorch-2.1",
          name: "PyTorch 2.1",
          description: "PyTorch 2.1 + CUDA 12.1 + Python 3.10",
          tags: ["PyTorch", "CUDA", "Jupyter"],
          size: "8.5GB",
          popular: true,
        },
        {
          id: "tensorflow-2.14",
          name: "TensorFlow 2.14",
          description: "TensorFlow 2.14 + CUDA 12.2 + Python 3.10",
          tags: ["TensorFlow", "Keras", "CUDA"],
          size: "9.2GB",
          popular: true,
        },
        {
          id: "pytorch-tensorflow",
          name: "PyTorch + TensorFlow",
          description: "PyTorch 2.1 + TensorFlow 2.14 完整环境",
          tags: ["PyTorch", "TensorFlow", "All-in-One"],
          size: "12.8GB",
          popular: false,
        },
      ],
    },
    {
      name: "机器学习平台",
      images: [
        {
          id: "jupyter-lab",
          name: "JupyterLab",
          description: "JupyterLab + 常用ML库 + CUDA支持",
          tags: ["Jupyter", "Pandas", "Scikit-learn"],
          size: "6.2GB",
          popular: true,
        },
        {
          id: "vscode-server",
          name: "VS Code Server",
          description: "VS Code Server + Python + CUDA开发环境",
          tags: ["VS Code", "Python", "Git"],
          size: "4.8GB",
          popular: false,
        },
        {
          id: "rstudio",
          name: "RStudio Server",
          description: "RStudio Server + R + 统计学习包",
          tags: ["R", "RStudio", "Statistics"],
          size: "3.5GB",
          popular: false,
        },
      ],
    },
    {
      name: "专业应用",
      images: [
        {
          id: "stable-diffusion",
          name: "Stable Diffusion",
          description: "Stable Diffusion WebUI + 常用模型",
          tags: ["AI绘画", "Diffusion", "WebUI"],
          size: "15.6GB",
          popular: true,
        },
        {
          id: "llm-inference",
          name: "大语言模型推理",
          description: "vLLM + Text Generation WebUI",
          tags: ["LLM", "推理", "API"],
          size: "11.2GB",
          popular: false,
        },
        {
          id: "opencv-cuda",
          name: "OpenCV + CUDA",
          description: "OpenCV 4.8 + CUDA + 计算机视觉库",
          tags: ["OpenCV", "CV", "CUDA"],
          size: "7.3GB",
          popular: false,
        },
      ],
    },
  ]

  const sharedStorageOptions = [
    {
      id: "datasets",
      name: "公共数据集",
      description: "包含ImageNet、COCO、CIFAR等常用数据集",
      size: "500GB",
      price: "免费",
    },
    {
      id: "models",
      name: "预训练模型",
      description: "常用的预训练模型和检查点文件",
      size: "1TB",
      price: "免费",
    },
    {
      id: "workspace",
      name: "个人工作空间",
      description: "持久化的个人文件存储空间",
      size: "200GB",
      price: "¥30/月",
    },
  ]

  const calculatePrice = () => {
    const config = gpuConfigs.find((c) => c.id === selectedConfig)
    if (!config) return "0.00"

    let basePrice = Number.parseFloat(config.price)

    // 添加存储费用（简化计算）
    const workspaceSelected = selectedStorage.includes("workspace")
    if (workspaceSelected) {
      basePrice += 0.05 // 每小时增加0.05元
    }

    return basePrice.toFixed(2)
  }

  const steps = [
    { id: 1, name: "选择配置", icon: <Settings className="w-4 h-4" /> },
    { id: 2, name: "选择镜像", icon: <Layers className="w-4 h-4" /> },
    { id: 3, name: "配置选项", icon: <Cpu className="w-4 h-4" /> },
    { id: 4, name: "确认创建", icon: <CheckCircle className="w-4 h-4" /> },
  ]

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedConfig !== ""
      case 2:
        return selectedImage !== ""
      case 3:
        return instanceName.trim() !== ""
      default:
        return true
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">创建GPU实例</h1>
          <p className="text-muted-foreground">选择配置和镜像，快速部署您的GPU计算环境</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.id
                      ? "bg-primary border-primary text-primary-foreground"
                      : "border-muted-foreground text-muted-foreground"
                  }`}
                >
                  {step.icon}
                </div>
                <div className="ml-3">
                  <div
                    className={`text-sm font-medium ${currentStep >= step.id ? "text-foreground" : "text-muted-foreground"}`}
                  >
                    {step.name}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${currentStep > step.id ? "bg-primary" : "bg-muted"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: 选择配置 */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>选择GPU配置</CardTitle>
                  <CardDescription>根据您的需求选择合适的GPU配置</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={selectedConfig} onValueChange={setSelectedConfig}>
                    <div className="space-y-4">
                      {gpuConfigs.map((config) => (
                        <div key={config.id} className="relative">
                          <RadioGroupItem value={config.id} id={config.id} className="sr-only" />
                          <Label
                            htmlFor={config.id}
                            className={`block p-4 border rounded-lg cursor-pointer transition-colors ${
                              selectedConfig === config.id
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <h3 className="font-semibold">{config.name}</h3>
                                {config.popular && <Badge>热门</Badge>}
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold">¥{config.price}</div>
                                <div className="text-sm text-muted-foreground">/小时</div>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-3">
                              <div>GPU: {config.gpu}</div>
                              <div>CPU: {config.cpu}</div>
                              <div>内存: {config.memory}</div>
                              <div>存储: {config.storage}</div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {config.specs.map((spec, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {spec}
                                </Badge>
                              ))}
                            </div>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            )}

            {/* Step 2: 选择镜像 */}
            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>选择系统镜像</CardTitle>
                  <CardDescription>选择预配置的开发环境镜像</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="深度学习框架">
                    <TabsList className="grid w-full grid-cols-3">
                      {imageCategories.map((category) => (
                        <TabsTrigger key={category.name} value={category.name}>
                          {category.name}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    {imageCategories.map((category) => (
                      <TabsContent key={category.name} value={category.name}>
                        <RadioGroup value={selectedImage} onValueChange={setSelectedImage}>
                          <div className="space-y-4">
                            {category.images.map((image) => (
                              <div key={image.id} className="relative">
                                <RadioGroupItem value={image.id} id={image.id} className="sr-only" />
                                <Label
                                  htmlFor={image.id}
                                  className={`block p-4 border rounded-lg cursor-pointer transition-colors ${
                                    selectedImage === image.id
                                      ? "border-primary bg-primary/5"
                                      : "border-border hover:border-primary/50"
                                  }`}
                                >
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center space-x-2">
                                      <h3 className="font-semibold">{image.name}</h3>
                                      {image.popular && <Badge>推荐</Badge>}
                                    </div>
                                    <Badge variant="outline">{image.size}</Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground mb-3">{image.description}</p>
                                  <div className="flex flex-wrap gap-2">
                                    {image.tags.map((tag, index) => (
                                      <Badge key={index} variant="secondary" className="text-xs">
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                </Label>
                              </div>
                            ))}
                          </div>
                        </RadioGroup>
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>
            )}

            {/* Step 3: 配置选项 */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>基本配置</CardTitle>
                    <CardDescription>设置实例名称和访问选项</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="instance-name">实例名称</Label>
                      <Input
                        id="instance-name"
                        placeholder="输入实例名称"
                        value={instanceName}
                        onChange={(e) => setInstanceName(e.target.value)}
                      />
                    </div>

                    <Separator />

                    <div>
                      <Label className="text-base font-medium">访问方式</Label>
                      <div className="space-y-3 mt-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="enable-web" checked={enableWeb} onCheckedChange={setEnableWeb} />
                          <Label htmlFor="enable-web" className="flex items-center space-x-2">
                            <Globe className="w-4 h-4" />
                            <span>启用Web访问 (Jupyter/WebUI)</span>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="enable-ssh" checked={enableSSH} onCheckedChange={setEnableSSH} />
                          <Label htmlFor="enable-ssh" className="flex items-center space-x-2">
                            <Terminal className="w-4 h-4" />
                            <span>启用SSH访问</span>
                          </Label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>共享存储</CardTitle>
                    <CardDescription>选择要挂载的共享存储卷</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {sharedStorageOptions.map((storage) => (
                        <div key={storage.id} className="flex items-center space-x-3">
                          <Checkbox
                            id={storage.id}
                            checked={selectedStorage.includes(storage.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedStorage([...selectedStorage, storage.id])
                              } else {
                                setSelectedStorage(selectedStorage.filter((id) => id !== storage.id))
                              }
                            }}
                          />
                          <div className="flex-1">
                            <Label htmlFor={storage.id} className="font-medium cursor-pointer">
                              {storage.name}
                            </Label>
                            <p className="text-sm text-muted-foreground">{storage.description}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">{storage.size}</div>
                            <div className="text-sm text-muted-foreground">{storage.price}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 4: 确认创建 */}
            {currentStep === 4 && (
              <Card>
                <CardHeader>
                  <CardTitle>确认配置</CardTitle>
                  <CardDescription>请确认您的实例配置信息</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">GPU配置</h4>
                      <div className="text-sm text-muted-foreground space-y-1">
                        {(() => {
                          const config = gpuConfigs.find((c) => c.id === selectedConfig)
                          return config ? (
                            <>
                              <div>型号: {config.name}</div>
                              <div>GPU: {config.gpu}</div>
                              <div>CPU: {config.cpu}</div>
                              <div>内存: {config.memory}</div>
                              <div>存储: {config.storage}</div>
                            </>
                          ) : null
                        })()}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">系统镜像</h4>
                      <div className="text-sm text-muted-foreground">
                        {(() => {
                          const image = imageCategories
                            .flatMap((cat) => cat.images)
                            .find((img) => img.id === selectedImage)
                          return image ? (
                            <>
                              <div>{image.name}</div>
                              <div>{image.description}</div>
                            </>
                          ) : null
                        })()}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium mb-2">实例配置</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>名称: {instanceName}</div>
                      <div>Web访问: {enableWeb ? "已启用" : "已禁用"}</div>
                      <div>SSH访问: {enableSSH ? "已启用" : "已禁用"}</div>
                    </div>
                  </div>

                  {selectedStorage.length > 0 && (
                    <>
                      <Separator />
                      <div>
                        <h4 className="font-medium mb-2">共享存储</h4>
                        <div className="text-sm text-muted-foreground space-y-1">
                          {selectedStorage.map((storageId) => {
                            const storage = sharedStorageOptions.find((s) => s.id === storageId)
                            return storage ? (
                              <div key={storageId}>
                                {storage.name} ({storage.size})
                              </div>
                            ) : null
                          })}
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar - Price Calculator */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  价格预估
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedConfig && (
                  <>
                    <div className="flex justify-between">
                      <span>GPU实例</span>
                      <span>¥{gpuConfigs.find((c) => c.id === selectedConfig)?.price}/小时</span>
                    </div>
                    {selectedStorage.includes("workspace") && (
                      <div className="flex justify-between text-sm">
                        <span>个人工作空间</span>
                        <span>¥0.05/小时</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>总计</span>
                      <span>¥{calculatePrice()}/小时</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <div>预估月费用: ¥{(Number.parseFloat(calculatePrice()) * 24 * 30).toFixed(0)}</div>
                      <div className="flex items-center mt-2">
                        <Clock className="w-4 h-4 mr-1" />
                        按秒计费，用多少付多少
                      </div>
                    </div>
                  </>
                )}

                {!selectedConfig && <div className="text-center text-muted-foreground py-8">选择配置后显示价格</div>}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            上一步
          </Button>

          {currentStep < 4 ? (
            <Button onClick={nextStep} disabled={!canProceed()}>
              下一步
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button asChild>
              <Link href="/dashboard">
                创建实例
                <CheckCircle className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
