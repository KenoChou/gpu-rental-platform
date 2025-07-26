"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Play,
  Square,
  Trash2,
  MoreHorizontal,
  Plus,
  Activity,
  Cpu,
  HardDrive,
  Wallet,
  Globe,
  Terminal,
  Copy,
  ExternalLink,
  Database,
  FolderOpen,
} from "lucide-react"
import { Navigation } from "@/components/navigation"
import { useState } from "react"

export default function DashboardPage() {
  const [copiedText, setCopiedText] = useState<string>("")

  const instances = [
    {
      id: "gpu-001",
      name: "AI训练实例",
      gpu: "RTX 4090",
      status: "running",
      uptime: "2小时 15分钟",
      cost: "5.25",
      usage: {
        gpu: 85,
        memory: 18.5,
        storage: 45,
      },
      access: {
        web: {
          enabled: true,
          url: "https://gpu-001.gpucloud.com",
          ports: [8888, 8080, 3000],
        },
        ssh: {
          enabled: true,
          host: "gpu-001.gpucloud.com",
          port: 22,
          username: "root",
        },
      },
      storage: {
        local: "200GB SSD",
        shared: [
          { name: "datasets", path: "/mnt/datasets", size: "500GB", type: "共享数据集" },
          { name: "models", path: "/mnt/models", size: "1TB", type: "模型存储" },
        ],
      },
    },
    {
      id: "gpu-002",
      name: "模型推理",
      gpu: "A100 80GB",
      status: "stopped",
      uptime: "0分钟",
      cost: "0.00",
      usage: {
        gpu: 0,
        memory: 0,
        storage: 12,
      },
      access: {
        web: {
          enabled: false,
          url: "",
          ports: [],
        },
        ssh: {
          enabled: false,
          host: "",
          port: 22,
          username: "root",
        },
      },
      storage: {
        local: "500GB SSD",
        shared: [{ name: "datasets", path: "/mnt/datasets", size: "500GB", type: "共享数据集" }],
      },
    },
  ]

  const sharedStorages = [
    {
      name: "datasets",
      size: "500GB",
      used: "320GB",
      type: "数据集存储",
      mountedInstances: 2,
      description: "包含常用的机器学习数据集",
    },
    {
      name: "models",
      size: "1TB",
      used: "680GB",
      type: "模型存储",
      mountedInstances: 1,
      description: "预训练模型和检查点文件",
    },
    {
      name: "workspace",
      size: "200GB",
      used: "45GB",
      type: "工作空间",
      mountedInstances: 3,
      description: "用户代码和项目文件",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "bg-green-500"
      case "stopped":
        return "bg-gray-500"
      case "starting":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "running":
        return "运行中"
      case "stopped":
        return "已停止"
      case "starting":
        return "启动中"
      default:
        return "未知"
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(text)
      setTimeout(() => setCopiedText(""), 2000)
    } catch (err) {
      console.error("复制失败:", err)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">控制台</h1>
            <p className="text-muted-foreground">管理您的GPU实例和资源</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            创建实例
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">运行实例</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">+0 较昨日</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">本月费用</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">¥125.50</div>
              <p className="text-xs text-muted-foreground">+12% 较上月</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">GPU使用率</CardTitle>
              <Cpu className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <p className="text-xs text-muted-foreground">平均使用率</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">共享存储</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1.7TB</div>
              <p className="text-xs text-muted-foreground">总容量</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="instances" className="space-y-6">
          <TabsList>
            <TabsTrigger value="instances">GPU实例</TabsTrigger>
            <TabsTrigger value="storage">共享存储</TabsTrigger>
          </TabsList>

          <TabsContent value="instances">
            <Card>
              <CardHeader>
                <CardTitle>GPU实例</CardTitle>
                <CardDescription>管理您的GPU计算实例</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {instances.map((instance) => (
                    <div key={instance.id} className="border rounded-lg p-6">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(instance.status)}`} />
                          <div>
                            <h3 className="font-semibold text-lg">{instance.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {instance.gpu} • {instance.id}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{getStatusText(instance.status)}</Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Play className="w-4 h-4 mr-2" />
                                启动
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Square className="w-4 h-4 mr-2" />
                                停止
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="w-4 h-4 mr-2" />
                                删除
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      {/* Resource Usage */}
                      <div className="grid md:grid-cols-3 gap-4 mb-6">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>GPU使用率</span>
                            <span>{instance.usage.gpu}%</span>
                          </div>
                          <Progress value={instance.usage.gpu} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>内存使用</span>
                            <span>{instance.usage.memory}GB</span>
                          </div>
                          <Progress value={(instance.usage.memory / 24) * 100} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>本地存储</span>
                            <span>{instance.usage.storage}GB</span>
                          </div>
                          <Progress value={instance.usage.storage} className="h-2" />
                        </div>
                      </div>

                      <Separator className="my-6" />

                      {/* Access Methods */}
                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        {/* Web Access */}
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <Globe className="w-4 h-4 text-blue-500" />
                            <h4 className="font-medium">Web访问</h4>
                            <Badge variant={instance.access.web.enabled ? "default" : "secondary"}>
                              {instance.access.web.enabled ? "已启用" : "未启用"}
                            </Badge>
                          </div>
                          {instance.access.web.enabled ? (
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <code className="text-sm bg-muted px-2 py-1 rounded flex-1">
                                  {instance.access.web.url}
                                </code>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => copyToClipboard(instance.access.web.url)}
                                >
                                  <Copy className="w-3 h-3" />
                                </Button>
                                <Button size="sm" variant="outline" asChild>
                                  <a href={instance.access.web.url} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
                                </Button>
                              </div>
                              <div className="flex flex-wrap gap-1">
                                <span className="text-xs text-muted-foreground">开放端口:</span>
                                {instance.access.web.ports.map((port) => (
                                  <Badge key={port} variant="outline" className="text-xs">
                                    {port}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground">实例停止时Web访问不可用</p>
                          )}
                        </div>

                        {/* SSH Access */}
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <Terminal className="w-4 h-4 text-green-500" />
                            <h4 className="font-medium">SSH访问</h4>
                            <Badge variant={instance.access.ssh.enabled ? "default" : "secondary"}>
                              {instance.access.ssh.enabled ? "已启用" : "未启用"}
                            </Badge>
                          </div>
                          {instance.access.ssh.enabled ? (
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <code className="text-sm bg-muted px-2 py-1 rounded flex-1">
                                  ssh {instance.access.ssh.username}@{instance.access.ssh.host}
                                </code>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() =>
                                    copyToClipboard(`ssh ${instance.access.ssh.username}@${instance.access.ssh.host}`)
                                  }
                                >
                                  <Copy className="w-3 h-3" />
                                </Button>
                              </div>
                              <div className="text-xs text-muted-foreground">
                                端口: {instance.access.ssh.port} | 用户名: {instance.access.ssh.username}
                              </div>
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground">实例停止时SSH访问不可用</p>
                          )}
                        </div>
                      </div>

                      <Separator className="my-6" />

                      {/* Storage Information */}
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <HardDrive className="w-4 h-4 text-purple-500" />
                          <h4 className="font-medium">存储配置</h4>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="text-sm font-medium">本地存储</div>
                            <div className="text-sm text-muted-foreground">{instance.storage.local}</div>
                          </div>
                          <div className="space-y-2">
                            <div className="text-sm font-medium">共享存储挂载</div>
                            <div className="space-y-1">
                              {instance.storage.shared.map((storage, index) => (
                                <div key={index} className="flex items-center justify-between text-sm">
                                  <span className="text-muted-foreground">
                                    {storage.name} ({storage.size})
                                  </span>
                                  <code className="text-xs bg-muted px-1 rounded">{storage.path}</code>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator className="my-6" />

                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>运行时间: {instance.uptime}</span>
                        <span>当前费用: ¥{instance.cost}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="storage">
            <Card>
              <CardHeader>
                <CardTitle>共享存储</CardTitle>
                <CardDescription>管理您的共享存储卷</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sharedStorages.map((storage, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg flex items-center">
                            <FolderOpen className="w-5 h-5 mr-2 text-blue-500" />
                            {storage.name}
                          </CardTitle>
                          <Badge variant="outline">{storage.type}</Badge>
                        </div>
                        <CardDescription>{storage.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>存储使用</span>
                            <span>
                              {storage.used} / {storage.size}
                            </span>
                          </div>
                          <Progress
                            value={(Number.parseInt(storage.used) / Number.parseInt(storage.size)) * 100}
                            className="h-2"
                          />
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">挂载实例</span>
                          <Badge variant="secondary">{storage.mountedInstances} 个</Badge>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            管理
                          </Button>
                          <Button size="sm" variant="outline">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="mt-6">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    创建共享存储
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
