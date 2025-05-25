"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bot, Send, Clipboard, ArrowRight, Loader2, Save, FileText } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function TriagemPage() {
  const [activeTab, setActiveTab] = useState("ai-assistant")
  const [messages, setMessages] = useState([
    {
      id: 1,
      content:
        "Olá! Sou o assistente de triagem. Vou ajudar você a preencher os dados do paciente. Por favor, descreva os sintomas e informações do paciente.",
      sender: "bot",
      timestamp: new Date().toISOString(),
    },
  ])
  const [input, setInput] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    nome: "",
    dataNascimento: "",
    cpf: "",
    telefone: "",
    email: "",
    endereco: "",
    temperatura: "",
    pressao: "",
    frequenciaCardiaca: "",
    frequenciaRespiratoria: "",
    saturacao: "",
    glicemia: "",
    queixa: "",
    inicioSintomas: "",
    intensidadeDor: "5",
    historicoMedico: [],
    medicamentos: "",
    classificacaoRisco: "verde",
    observacoes: "",
  })
  const [showResults, setShowResults] = useState(false)
  const messagesEndRef = useRef(null)

  const historicoMedicoOptions = [
    "Hipertensão",
    "Diabetes",
    "Asma",
    "Cardiopatia",
    "Câncer",
    "AVC",
    "Epilepsia",
    "Alergias",
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e) => {
    e.preventDefault()

    if (!input.trim()) return

    // Adiciona a mensagem do usuário
    const userMessage = {
      id: messages.length + 1,
      content: input,
      sender: "user",
      timestamp: new Date().toISOString(),
    }

    setMessages([...messages, userMessage])
    setInput("")
    setIsProcessing(true)

    // Simula o processamento da IA
    setTimeout(() => {
      // Simula a análise da mensagem do usuário e extração de informações
      const extractedData = simulateAIExtraction(input)

      // Atualiza o formulário com os dados extraídos
      setFormData((prev) => ({
        ...prev,
        ...extractedData,
        
      }))

      // Gera resposta do bot
      const botResponse = {
        id: messages.length + 2,
        content: generateBotResponse(extractedData),
        sender: "bot",
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, botResponse])
      setIsProcessing(false)
    }, 1500)
  }

  // Função que simula a extração de dados pela IA
  const simulateAIExtraction = (userInput) => {
    const extractedData = {}
    const input = userInput.toLowerCase()

    // Simula extração de nome
    if (input.includes("nome") || input.includes("chamo")) {
      const nameMatch =
        input.match(/nome (?:é|do paciente é|dela é|dele é) ([a-zA-ZÀ-ÿ\s]+)/i) ||
        input.match(/chamo ([a-zA-ZÀ-ÿ\s]+)/i)
      if (nameMatch && nameMatch[1]) {
        extractedData.nome = nameMatch[1].trim()
      }
    }

    // Simula extração de temperatura
    if (input.includes("temperatura") || input.includes("febre")) {
      const tempMatch = input.match(/(\d+[.,]?\d*)\s*(?:graus|°C)/i)
      if (tempMatch && tempMatch[1]) {
        extractedData.temperatura = tempMatch[1].replace(",", ".")
      } else if (input.includes("febre")) {
        extractedData.temperatura = "38.5"
      }
    }

    // Simula extração de pressão arterial
    if (input.includes("pressão")) {
      const pressaoMatch = input.match(/pressão (?:é|de|arterial) (\d+)[/x](\d+)/i)
      if (pressaoMatch && pressaoMatch[1] && pressaoMatch[2]) {
        extractedData.pressao = `${pressaoMatch[1]}/${pressaoMatch[2]}`
      }
    }

    // Simula extração de queixa principal
    if (input.includes("dor") || input.includes("sintoma") || input.includes("queixa")) {
      let queixa = ""

      if (input.includes("dor de cabeça") || input.includes("cefaleia")) {
        queixa = "Paciente relata dor de cabeça intensa"
        extractedData.intensidadeDor = "7"
      } else if (input.includes("dor no peito")) {
        queixa = "Paciente relata dor no peito com irradiação para o braço esquerdo"
        extractedData.intensidadeDor = "8"
        extractedData.classificacaoRisco = "vermelho"
      } else if (input.includes("febre") && (input.includes("tosse") || input.includes("garganta"))) {
        queixa = "Paciente apresenta febre, tosse e dor de garganta há 2 dias"
        extractedData.intensidadeDor = "5"
      } else if (input.includes("tontura") || input.includes("desmaio")) {
        queixa = "Paciente relata tontura e episódio de desmaio"
        extractedData.classificacaoRisco = "laranja"
      } else {
        // Extrai a frase que contém a palavra "dor", "sintoma" ou "queixa"
        const sentences = input.split(/[.!?]+/)
        for (const sentence of sentences) {
          if (sentence.includes("dor") || sentence.includes("sintoma") || sentence.includes("queixa")) {
            queixa = sentence.trim()
            break
          }
        }
      }

      if (queixa) {
        extractedData.queixa = queixa.charAt(0).toUpperCase() + queixa.slice(1)
      }
    }

    // Simula extração de histórico médico
    historicoMedicoOptions.forEach((condicao) => {
      if (input.includes(condicao.toLowerCase())) {
        if (!extractedData.historicoMedico) {
          extractedData.historicoMedico = []
        }
        extractedData.historicoMedico.push(condicao)
      }
    })

    // Simula extração de início dos sintomas
    if (input.includes("começou") || input.includes("início") || input.includes("desde")) {
      if (input.includes("hoje")) {
        extractedData.inicioSintomas = "hoje"
      } else if (input.includes("ontem")) {
        extractedData.inicioSintomas = "ontem"
      } else if (input.includes("dias") || input.includes("dia")) {
        extractedData.inicioSintomas = "2-3dias"
      } else if (input.includes("semana")) {
        extractedData.inicioSintomas = "semana"
      } else if (input.includes("mês") || input.includes("mes")) {
        extractedData.inicioSintomas = "mes"
      }
    }

    return extractedData
  }

  // Função que gera resposta do bot com base nos dados extraídos
  const generateBotResponse = (extractedData) => {
    const keys = Object.keys(extractedData)

    if (keys.length === 0) {
      return "Não consegui identificar informações específicas. Poderia fornecer mais detalhes sobre o paciente? Por exemplo, nome, idade, sintomas principais ou histórico médico."
    }

    let response = "Obrigado pelas informações. "

    if (extractedData.nome) {
      response += `Registrei o nome do paciente como ${extractedData.nome}. `
    }

    if (extractedData.temperatura) {
      response += `A temperatura de ${extractedData.temperatura}°C foi registrada. `
    }

    if (extractedData.pressao) {
      response += `Pressão arterial de ${extractedData.pressao} anotada. `
    }

    if (extractedData.queixa) {
      response += `Entendi que a queixa principal é: "${extractedData.queixa}". `
    }

    if (extractedData.historicoMedico && extractedData.historicoMedico.length > 0) {
      response += `Registrei as seguintes condições no histórico médico: ${extractedData.historicoMedico.join(", ")}. `
    }

    if (extractedData.inicioSintomas) {
      const inicioMap = {
        hoje: "hoje",
        ontem: "ontem",
        "2-3dias": "há 2-3 dias",
        semana: "há uma semana",
        mes: "há um mês ou mais",
      }
      response += `Os sintomas começaram ${inicioMap[extractedData.inicioSintomas]}. `
    }

    if (extractedData.classificacaoRisco === "vermelho") {
      response +=
        "⚠️ Com base nas informações fornecidas, este caso parece ser de EMERGÊNCIA e requer atenção imediata. "
    } else if (extractedData.classificacaoRisco === "laranja") {
      response += "⚠️ Este caso parece ser MUITO URGENTE com base nas informações fornecidas. "
    }

    response += "Há mais alguma informação que gostaria de adicionar?"

    return response
  }

  // Função para preencher o formulário com dados de exemplo
  const preencherExemplo = () => {
    const dadosExemplo = {
      nome: "Maria Silva",
      dataNascimento: "1985-06-15",
      cpf: "123.456.789-00",
      telefone: "(11) 98765-4321",
      email: "maria.silva@email.com",
      endereco: "Rua das Flores, 123 - São Paulo, SP",
      temperatura: "38.2",
      pressao: "140/90",
      frequenciaCardiaca: "88",
      frequenciaRespiratoria: "18",
      saturacao: "96",
      glicemia: "110",
      queixa: "Paciente relata dor de cabeça intensa, febre e mal-estar há 2 dias",
      inicioSintomas: "2-3dias",
      intensidadeDor: "7",
      historicoMedico: ["Hipertensão", "Alergias"],
      medicamentos: "Losartana 50mg 1x ao dia, Dipirona quando necessário",
      classificacaoRisco: "amarelo",
      observacoes: "Paciente apresenta desidratação leve. Recomendado aumento da ingestão de líquidos.",
    }

    setFormData(dadosExemplo)

    // Adiciona mensagem do bot informando sobre o preenchimento automático
    const botMessage = {
      id: messages.length + 1,
      content:
        "Preenchi o formulário com dados de exemplo para demonstração. Você pode revisar e editar conforme necessário.",
      sender: "bot",
      timestamp: new Date().toISOString(),
    }

    setMessages([...messages, botMessage])
  }

  // Função para finalizar a triagem e mostrar os resultados
  const finalizarTriagem = () => {
    setShowResults(true)
    setActiveTab("resultados")
  }

  // Função para voltar ao formulário
  const voltarAoFormulario = () => {
    setShowResults(false)
    setActiveTab("formulario")
  }

  // Função para lidar com mudanças no formulário
  const handleFormChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Função para lidar com mudanças no histórico médico (checkboxes)
  const handleHistoricoChange = (condition) => {
    setFormData((prev) => {
      const historicoAtual = [...prev.historicoMedico]

      if (historicoAtual.includes(condition)) {
        return {
          ...prev,
          historicoMedico: historicoAtual.filter((item) => item !== condition),
        }
      } else {
        return {
          ...prev,
          historicoMedico: [...historicoAtual, condition],
        }
      }
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Triagem de Pacientes</h1>
        <p className="text-gray-500 mt-1">Use o assistente de IA para preencher o formulário ou preencha manualmente</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
          <TabsTrigger value="ai-assistant">Assistente IA</TabsTrigger>
          <TabsTrigger value="formulario">Formulário</TabsTrigger>
          <TabsTrigger value="resultados" disabled={!showResults}>
            Resultados
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ai-assistant">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="h-[calc(100vh-220px)] flex flex-col">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8 bg-teal-100">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Bot Avatar" />
                      <AvatarFallback className="bg-teal-100 text-teal-700">
                        <Bot size={16} />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">Assistente de Triagem</CardTitle>
                      <CardDescription className="text-xs">Powered by IA</CardDescription>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={preencherExemplo}>
                    <Clipboard className="h-4 w-4 mr-2" />
                    Exemplo
                  </Button>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto pb-0 flex flex-col">
                  <div className="flex-1 space-y-4 mb-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.sender === "user" ? "bg-teal-500 text-white" : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          <p>{message.content}</p>
                          <p
                            className={`text-xs mt-1 ${message.sender === "user" ? "text-teal-100" : "text-gray-500"}`}
                          >
                            {new Date(message.timestamp).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                    {isProcessing && (
                      <div className="flex justify-start">
                        <div className="max-w-[80%] rounded-lg p-3 bg-gray-100 text-gray-800">
                          <div className="flex items-center space-x-2">
                            <Loader2 className="h-4 w-4 animate-spin text-teal-600" />
                            <p className="text-sm">Analisando informações...</p>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                  <form onSubmit={handleSendMessage} className="sticky bottom-0 bg-white pt-3 pb-3">
                    <div className="flex space-x-2">
                      <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Descreva os sintomas e informações do paciente..."
                        className="flex-1"
                      />
                      <Button type="submit" className="bg-teal-600 hover:bg-teal-700" disabled={isProcessing}>
                        <Send size={18} />
                      </Button>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="border-t pt-3">
                  <Button
                    variant="default"
                    className="w-full bg-teal-600 hover:bg-teal-700"
                    onClick={() => setActiveTab("formulario")}
                  >
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Continuar para o Formulário
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Dados Extraídos</CardTitle>
                  <CardDescription>Informações identificadas pelo assistente</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formData.nome && (
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Nome:</p>
                      <p className="text-sm bg-gray-50 p-2 rounded">{formData.nome}</p>
                    </div>
                  )}

                  {formData.temperatura && (
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Temperatura:</p>
                      <p className="text-sm bg-gray-50 p-2 rounded">{formData.temperatura}°C</p>
                    </div>
                  )}

                  {formData.pressao && (
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Pressão Arterial:</p>
                      <p className="text-sm bg-gray-50 p-2 rounded">{formData.pressao} mmHg</p>
                    </div>
                  )}

                  {formData.queixa && (
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Queixa Principal:</p>
                      <p className="text-sm bg-gray-50 p-2 rounded">{formData.queixa}</p>
                    </div>
                  )}

                  {formData.inicioSintomas && (
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Início dos Sintomas:</p>
                      <p className="text-sm bg-gray-50 p-2 rounded">
                        {formData.inicioSintomas === "hoje" && "Hoje"}
                        {formData.inicioSintomas === "ontem" && "Ontem"}
                        {formData.inicioSintomas === "2-3dias" && "2-3 dias atrás"}
                        {formData.inicioSintomas === "semana" && "Uma semana atrás"}
                        {formData.inicioSintomas === "mes" && "Um mês ou mais"}
                      </p>
                    </div>
                  )}

                  {formData.historicoMedico && formData.historicoMedico.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Histórico Médico:</p>
                      <p className="text-sm bg-gray-50 p-2 rounded">{formData.historicoMedico.join(", ")}</p>
                    </div>
                  )}

                  {formData.classificacaoRisco && (
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Classificação de Risco:</p>
                      <div
                        className={`text-sm p-2 rounded-lg font-medium ${
                          formData.classificacaoRisco === "vermelho"
                            ? "bg-red-100 text-red-700"
                            : formData.classificacaoRisco === "laranja"
                              ? "bg-amber-100 text-amber-700"
                              : formData.classificacaoRisco === "amarelo"
                                ? "bg-yellow-100 text-yellow-700"
                                : formData.classificacaoRisco === "verde"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {formData.classificacaoRisco === "vermelho" && "Emergência (Vermelho)"}
                        {formData.classificacaoRisco === "laranja" && "Muito Urgente (Laranja)"}
                        {formData.classificacaoRisco === "amarelo" && "Urgente (Amarelo)"}
                        {formData.classificacaoRisco === "verde" && "Pouco Urgente (Verde)"}
                        {formData.classificacaoRisco === "azul" && "Não Urgente (Azul)"}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="formulario">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informações do Paciente</CardTitle>
                  <CardDescription>Dados pessoais e de contato</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome Completo</Label>
                      <Input
                        id="nome"
                        placeholder="Nome completo do paciente"
                        value={formData.nome}
                        onChange={(e) => handleFormChange("nome", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="data-nascimento">Data de Nascimento</Label>
                      <Input
                        id="data-nascimento"
                        type="date"
                        value={formData.dataNascimento}
                        onChange={(e) => handleFormChange("dataNascimento", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cpf">CPF</Label>
                      <Input
                        id="cpf"
                        placeholder="000.000.000-00"
                        value={formData.cpf}
                        onChange={(e) => handleFormChange("cpf", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input
                        id="telefone"
                        placeholder="(00) 00000-0000"
                        value={formData.telefone}
                        onChange={(e) => handleFormChange("telefone", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@exemplo.com"
                      value={formData.email}
                      onChange={(e) => handleFormChange("email", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endereco">Endereço</Label>
                    <Input
                      id="endereco"
                      placeholder="Endereço completo"
                      value={formData.endereco}
                      onChange={(e) => handleFormChange("endereco", e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sinais Vitais</CardTitle>
                  <CardDescription>Registro dos sinais vitais do paciente</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="temperatura">Temperatura (°C)</Label>
                      <Input
                        id="temperatura"
                        type="number"
                        step="0.1"
                        placeholder="36.5"
                        value={formData.temperatura}
                        onChange={(e) => handleFormChange("temperatura", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pressao">Pressão Arterial (mmHg)</Label>
                      <Input
                        id="pressao"
                        placeholder="120/80"
                        value={formData.pressao}
                        onChange={(e) => handleFormChange("pressao", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="frequencia-cardiaca">Freq. Cardíaca (bpm)</Label>
                      <Input
                        id="frequencia-cardiaca"
                        type="number"
                        placeholder="80"
                        value={formData.frequenciaCardiaca}
                        onChange={(e) => handleFormChange("frequenciaCardiaca", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="frequencia-respiratoria">Freq. Respiratória</Label>
                      <Input
                        id="frequencia-respiratoria"
                        type="number"
                        placeholder="16"
                        value={formData.frequenciaRespiratoria}
                        onChange={(e) => handleFormChange("frequenciaRespiratoria", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="saturacao">Saturação O₂ (%)</Label>
                      <Input
                        id="saturacao"
                        type="number"
                        placeholder="98"
                        value={formData.saturacao}
                        onChange={(e) => handleFormChange("saturacao", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="glicemia">Glicemia (mg/dL)</Label>
                      <Input
                        id="glicemia"
                        type="number"
                        placeholder="100"
                        value={formData.glicemia}
                        onChange={(e) => handleFormChange("glicemia", e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Queixa e Histórico</CardTitle>
                  <CardDescription>Informações sobre a queixa principal e histórico médico</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="queixa">Queixa Principal</Label>
                    <Textarea
                      id="queixa"
                      placeholder="Descreva a queixa principal do paciente"
                      rows={3}
                      value={formData.queixa}
                      onChange={(e) => handleFormChange("queixa", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="inicio">Início dos Sintomas</Label>
                    <Select
                      value={formData.inicioSintomas}
                      onValueChange={(value) => handleFormChange("inicioSintomas", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tempo de início" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hoje">Hoje</SelectItem>
                        <SelectItem value="ontem">Ontem</SelectItem>
                        <SelectItem value="2-3dias">2-3 dias</SelectItem>
                        <SelectItem value="semana">Uma semana</SelectItem>
                        <SelectItem value="mes">Um mês ou mais</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Intensidade da Dor (se aplicável)</Label>
                    <RadioGroup
                      value={formData.intensidadeDor}
                      onValueChange={(value) => handleFormChange("intensidadeDor", value)}
                      className="flex space-x-2"
                    >
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                        <div key={value} className="flex flex-col items-center">
                          <RadioGroupItem value={value.toString()} id={`dor-${value}`} className="sr-only" />
                          <Label
                            htmlFor={`dor-${value}`}
                            className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer border border-gray-200 hover:bg-gray-100 data-[state=checked]:bg-teal-100 data-[state=checked]:border-teal-500 data-[state=checked]:text-teal-700"
                          >
                            {value}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Sem dor</span>
                      <span>Dor máxima</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Histórico Médico</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {historicoMedicoOptions.map((condition) => (
                        <div key={condition} className="flex items-center space-x-2">
                          <Checkbox
                            id={`condition-${condition}`}
                            checked={formData.historicoMedico.includes(condition)}
                            onCheckedChange={() => handleHistoricoChange(condition)}
                          />
                          <Label htmlFor={`condition-${condition}`}>{condition}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="medicamentos">Medicamentos em Uso</Label>
                    <Textarea
                      id="medicamentos"
                      placeholder="Liste os medicamentos que o paciente utiliza"
                      rows={2}
                      value={formData.medicamentos}
                      onChange={(e) => handleFormChange("medicamentos", e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Classificação de Risco</CardTitle>
                  <CardDescription>Selecione o nível de prioridade</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={formData.classificacaoRisco}
                    onValueChange={(value) => handleFormChange("classificacaoRisco", value)}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2 p-3 rounded-lg bg-red-50 border border-red-100">
                      <RadioGroupItem value="vermelho" id="vermelho" />
                      <Label htmlFor="vermelho" className="font-medium text-red-700">
                        Emergência (Vermelho)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg bg-amber-50 border border-amber-100">
                      <RadioGroupItem value="laranja" id="laranja" />
                      <Label htmlFor="laranja" className="font-medium text-amber-700">
                        Muito Urgente (Laranja)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg bg-yellow-50 border border-yellow-100">
                      <RadioGroupItem value="amarelo" id="amarelo" />
                      <Label htmlFor="amarelo" className="font-medium text-yellow-700">
                        Urgente (Amarelo)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg bg-green-50 border border-green-100">
                      <RadioGroupItem value="verde" id="verde" />
                      <Label htmlFor="verde" className="font-medium text-green-700">
                        Pouco Urgente (Verde)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 rounded-lg bg-blue-50 border border-blue-100">
                      <RadioGroupItem value="azul" id="azul" />
                      <Label htmlFor="azul" className="font-medium text-blue-700">
                        Não Urgente (Azul)
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Observações</CardTitle>
                  <CardDescription>Informações adicionais relevantes</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Adicione observações importantes sobre o paciente"
                    rows={5}
                    value={formData.observacoes}
                    onChange={(e) => handleFormChange("observacoes", e.target.value)}
                  />
                </CardContent>
              </Card>

              <div className="flex space-x-3">
                <Button variant="outline" className="flex-1" onClick={() => setActiveTab("ai-assistant")}>
                  Voltar
                </Button>
                <Button className="flex-1 bg-teal-600 hover:bg-teal-700" onClick={finalizarTriagem}>
                  Finalizar Triagem
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="resultados">
          <Card>
            <CardHeader className="bg-gray-50 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Resultado da Triagem</CardTitle>
                  <CardDescription>Resumo dos dados coletados</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={voltarAoFormulario}>
                    Editar
                  </Button>
                  <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                    <FileText className="h-4 w-4 mr-2" />
                    Imprimir
                  </Button>
                  <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                    <Save className="h-4 w-4 mr-2" />
                    Salvar
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div
                  className={`p-4 rounded-lg ${
                    formData.classificacaoRisco === "vermelho"
                      ? "bg-red-50 border border-red-200"
                      : formData.classificacaoRisco === "laranja"
                        ? "bg-amber-50 border border-amber-200"
                        : formData.classificacaoRisco === "amarelo"
                          ? "bg-yellow-50 border border-yellow-200"
                          : formData.classificacaoRisco === "verde"
                            ? "bg-green-50 border border-green-200"
                            : "bg-blue-50 border border-blue-200"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        formData.classificacaoRisco === "vermelho"
                          ? "bg-red-100 text-red-700"
                          : formData.classificacaoRisco === "laranja"
                            ? "bg-amber-100 text-amber-700"
                            : formData.classificacaoRisco === "amarelo"
                              ? "bg-yellow-100 text-yellow-700"
                              : formData.classificacaoRisco === "verde"
                                ? "bg-green-100 text-green-700"
                                : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      <span className="text-xl font-bold">
                        {formData.classificacaoRisco === "vermelho" && "E"}
                        {formData.classificacaoRisco === "laranja" && "MU"}
                        {formData.classificacaoRisco === "amarelo" && "U"}
                        {formData.classificacaoRisco === "verde" && "PU"}
                        {formData.classificacaoRisco === "azul" && "NU"}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">
                        {formData.classificacaoRisco === "vermelho" && "Emergência"}
                        {formData.classificacaoRisco === "laranja" && "Muito Urgente"}
                        {formData.classificacaoRisco === "amarelo" && "Urgente"}
                        {formData.classificacaoRisco === "verde" && "Pouco Urgente"}
                        {formData.classificacaoRisco === "azul" && "Não Urgente"}
                      </h3>
                      <p className="text-sm">
                        {formData.classificacaoRisco === "vermelho" && "Atendimento imediato"}
                        {formData.classificacaoRisco === "laranja" && "Atendimento em até 10 minutos"}
                        {formData.classificacaoRisco === "amarelo" && "Atendimento em até 30 minutos"}
                        {formData.classificacaoRisco === "verde" && "Atendimento em até 1 hora"}
                        {formData.classificacaoRisco === "azul" && "Atendimento em até 4 horas"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold border-b pb-2">Dados do Paciente</h3>
                      <div className="space-y-3 mt-3">
                        <div className="grid grid-cols-3 gap-2">
                          <p className="text-sm font-medium text-gray-500">Nome:</p>
                          <p className="text-sm col-span-2">{formData.nome || "Não informado"}</p>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <p className="text-sm font-medium text-gray-500">Data de Nascimento:</p>
                          <p className="text-sm col-span-2">
                            {formData.dataNascimento
                              ? new Date(formData.dataNascimento).toLocaleDateString("pt-BR")
                              : "Não informado"}
                          </p>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <p className="text-sm font-medium text-gray-500">CPF:</p>
                          <p className="text-sm col-span-2">{formData.cpf || "Não informado"}</p>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <p className="text-sm font-medium text-gray-500">Telefone:</p>
                          <p className="text-sm col-span-2">{formData.telefone || "Não informado"}</p>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <p className="text-sm font-medium text-gray-500">E-mail:</p>
                          <p className="text-sm col-span-2">{formData.email || "Não informado"}</p>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <p className="text-sm font-medium text-gray-500">Endereço:</p>
                          <p className="text-sm col-span-2">{formData.endereco || "Não informado"}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold border-b pb-2">Sinais Vitais</h3>
                      <div className="grid grid-cols-2 gap-3 mt-3">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Temperatura:</p>
                          <p className="text-sm">
                            {formData.temperatura ? `${formData.temperatura}°C` : "Não aferida"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Pressão Arterial:</p>
                          <p className="text-sm">{formData.pressao ? `${formData.pressao} mmHg` : "Não aferida"}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Freq. Cardíaca:</p>
                          <p className="text-sm">
                            {formData.frequenciaCardiaca ? `${formData.frequenciaCardiaca} bpm` : "Não aferida"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Freq. Respiratória:</p>
                          <p className="text-sm">
                            {formData.frequenciaRespiratoria
                              ? `${formData.frequenciaRespiratoria} irpm`
                              : "Não aferida"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Saturação O₂:</p>
                          <p className="text-sm">{formData.saturacao ? `${formData.saturacao}%` : "Não aferida"}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Glicemia:</p>
                          <p className="text-sm">{formData.glicemia ? `${formData.glicemia} mg/dL` : "Não aferida"}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold border-b pb-2">Queixa e Histórico</h3>
                      <div className="space-y-3 mt-3">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Queixa Principal:</p>
                          <p className="text-sm mt-1 p-2 bg-gray-50 rounded">{formData.queixa || "Não informada"}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <p className="text-sm font-medium text-gray-500">Início dos Sintomas:</p>
                            <p className="text-sm">
                              {formData.inicioSintomas === "hoje" && "Hoje"}
                              {formData.inicioSintomas === "ontem" && "Ontem"}
                              {formData.inicioSintomas === "2-3dias" && "2-3 dias atrás"}
                              {formData.inicioSintomas === "semana" && "Uma semana atrás"}
                              {formData.inicioSintomas === "mes" && "Um mês ou mais"}
                              {!formData.inicioSintomas && "Não informado"}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Intensidade da Dor:</p>
                            <p className="text-sm">{formData.intensidadeDor || "Não avaliada"}/10</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Histórico Médico:</p>
                          <p className="text-sm">
                            {formData.historicoMedico && formData.historicoMedico.length > 0
                              ? formData.historicoMedico.join(", ")
                              : "Nenhum histórico relevante informado"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Medicamentos em Uso:</p>
                          <p className="text-sm mt-1 p-2 bg-gray-50 rounded">
                            {formData.medicamentos || "Nenhum medicamento em uso informado"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold border-b pb-2">Observações</h3>
                      <p className="text-sm mt-3 p-2 bg-gray-50 rounded min-h-[100px]">
                        {formData.observacoes || "Nenhuma observação adicional."}
                      </p>
                    </div>
                  </div>
                </div>

                <Alert className="mt-6">
                  <FileText className="h-4 w-4" />
                  <AlertTitle>Triagem realizada com auxílio de IA</AlertTitle>
                  <AlertDescription>
                    Esta triagem foi realizada com o auxílio do assistente de IA. Os dados foram revisados por um
                    profissional de saúde.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
