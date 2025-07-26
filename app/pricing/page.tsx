import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import { Navigation } from "@/components/navigation"

export default function PricingPage() {
  const pricingTiers = [
    {
      name: "入门版",
      price: "0.80",
      description: "适合个人学习和小型项目",
      features: ["RTX 3060 Ti (8GB)", "4 vCPU", "16GB RAM", "50GB SSD存储", "基础技术支持", "按小时计费"],
      popular: false,
    },
    {
      name: "专业版",
      price: "2.50",
      description: "适合专业开发和中型训练任务",
      features: [
        "RTX 4090 (24GB)",
        "8 vCPU",
        "32GB RAM",
        "200GB SSD存储",
        "优先技术支持",
        "按小时计费",
        "预装深度学习框架",
      ],
      popular: true,
    },
    {
      name: "企业版",
      price: "8.50",
      description: "适合大规模训练和生产环境",
      features: [
        "H100 SXM (80GB)",
        "16 vCPU",
        "128GB RAM",
        "1TB NVMe存储",
        "24/7专属支持",
        "按小时计费",
        "多GPU集群支持",
        "企业级安全",
      ],
      popular: false,
    },
  ]

  const additionalServices = [
    {
      name: "数据传输",
      price: "免费",
      description: "入站流量免费，出站流量前100GB免费",
    },
    {
      name: "存储扩展",
      price: "0.15",
      description: "每GB/月，高性能SSD存储",
    },
    {
      name: "快照备份",
      price: "0.05",
      description: "每GB/月，自动备份您的数据",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              💰 透明定价
            </Badge>
            <h1 className="text-4xl font-bold mb-4">简单透明的定价</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              按需使用，按秒计费。无隐藏费用，无最低消费要求。
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {pricingTiers.map((tier, index) => (
              <Card key={index} className={`relative ${tier.popular ? "ring-2 ring-primary scale-105" : ""}`}>
                {tier.popular && <Badge className="absolute -top-2 left-1/2 -translate-x-1/2">最受欢迎</Badge>}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <CardDescription className="mt-2">{tier.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">¥{tier.price}</span>
                    <span className="text-muted-foreground">/小时</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6" variant={tier.popular ? "default" : "outline"}>
                    选择{tier.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Services */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-center mb-8">附加服务</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {additionalServices.map((service, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <div className="text-2xl font-bold">
                      {service.price === "免费" ? service.price : `¥${service.price}`}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">常见问题</h2>
            <div className="max-w-2xl mx-auto space-y-4 text-left">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">如何计费？</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    我们按秒计费，只收取实际使用时间的费用。实例停止后立即停止计费。
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">是否有免费试用？</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">新用户注册即可获得¥50免费额度，足够体验我们的服务。</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">支持哪些支付方式？</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">支持支付宝、微信支付、银行卡等多种支付方式。</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
