import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Cpu, Zap, Clock, Shield, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

export default function HomePage() {
  const gpuInstances = [
    {
      name: "RTX 4090",
      memory: "24GB GDDR6X",
      cores: "16,384 CUDA",
      price: "2.50",
      popular: true,
      specs: ["PCIe 4.0", "83 RT Cores", "264 Tensor Cores"],
    },
    {
      name: "A100 80GB",
      memory: "80GB HBM2e",
      cores: "6,912 CUDA",
      price: "4.20",
      popular: false,
      specs: ["NVLink", "432 Tensor Cores", "Multi-Instance GPU"],
    },
    {
      name: "H100 SXM",
      memory: "80GB HBM3",
      cores: "14,592 CUDA",
      price: "8.50",
      popular: false,
      specs: ["900GB/s", "528 Tensor Cores", "Transformer Engine"],
    },
    {
      name: "RTX 3080",
      memory: "10GB GDDR6X",
      cores: "8,704 CUDA",
      price: "1.80",
      popular: false,
      specs: ["PCIe 4.0", "68 RT Cores", "272 Tensor Cores"],
    },
  ]

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "即时部署",
      description: "秒级启动GPU实例，无需等待",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "安全可靠",
      description: "企业级安全保障，数据隔离保护",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "按需计费",
      description: "按秒计费，用多少付多少",
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "高性能",
      description: "最新GPU硬件，极致性能体验",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-b from-muted/50 to-background">
        <div className="max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-4">
            🚀 新用户首月8折优惠
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            GPU算力租赁云平台
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            提供高性能GPU云计算服务，支持AI训练、深度学习、科学计算等场景。按需使用，灵活计费。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/dashboard">
                立即开始 <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline">
              查看价格
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">为什么选择我们</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* GPU Instances */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">GPU实例配置</h2>
            <p className="text-muted-foreground">选择适合您需求的GPU配置</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gpuInstances.map((instance, index) => (
              <Card key={index} className={`relative ${instance.popular ? "ring-2 ring-primary" : ""}`}>
                {instance.popular && <Badge className="absolute -top-2 left-1/2 -translate-x-1/2">热门选择</Badge>}
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {instance.name}
                    <Badge variant="outline">{instance.memory}</Badge>
                  </CardTitle>
                  <CardDescription>{instance.cores}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-3xl font-bold">
                    ¥{instance.price}
                    <span className="text-sm font-normal text-muted-foreground">/小时</span>
                  </div>
                  <Separator />
                  <ul className="space-y-2">
                    {instance.specs.map((spec, specIndex) => (
                      <li key={specIndex} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {spec}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={instance.popular ? "default" : "outline"}>
                    选择配置
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">准备开始您的AI之旅？</h2>
          <p className="text-xl text-muted-foreground mb-8">注册账户，立即获得免费试用额度</p>
          <Button size="lg" asChild>
            <Link href="/dashboard">
              免费试用 <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
