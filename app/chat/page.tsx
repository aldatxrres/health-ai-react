"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Info, Bot } from "lucide-react"

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: "Olá! Sou o assistente virtual do consultório. Como posso ajudar você hoje?",
      sender: "bot",
      timestamp: new Date().toISOString(),
    },
  ])
  const [input, setInput] = useState("")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    const userMessage = {
      id: messages.length + 1,
      content: input,
      sender: "user",
      timestamp: new Date().toISOString(),
    }

    setMessages([...messages, userMessage])
    setInput("")

    setTimeout(() => {
      const botResponses = [
        "Entendi sua dúvida. Vou ajudar com isso!",
        "Para essa questão, recomendo consultar diretamente com o médico na próxima consulta.",
        "Essa é uma dúvida comum. Geralmente, o procedimento recomendado é...",
        "Vou verificar essa informação para você. Um momento, por favor.",
        "Baseado no que você descreveu, isso pode ser normal, mas é sempre bom consultar um profissional.",
      ]

      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]

      const botMessage = {
        id: messages.length + 2,
        content: randomResponse,
        sender: "bot",
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, botMessage])
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Chat de Dúvidas</h1>
        <p className="text-gray-500 mt-1">Tire suas dúvidas com nosso assistente virtual</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card className="h-[calc(100vh-220px)] flex flex-col">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8 bg-teal-100">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Bot Avatar" />
                  <AvatarFallback className="bg-teal-100 text-teal-700">
                    <Bot size={16} />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">Assistente MediAssist</CardTitle>
                  <CardDescription className="text-xs">Online agora</CardDescription>
                </div>
              </div>
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
                      <p className={`text-xs mt-1 ${message.sender === "user" ? "text-teal-100" : "text-gray-500"}`}>
                        {new Date(message.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSendMessage} className="sticky bottom-0 bg-white pt-3 pb-3">
                <div className="flex space-x-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Digite sua mensagem..."
                    className="flex-1"
                  />
                  <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
                    <Send size={18} />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tópicos Frequentes</CardTitle>
              <CardDescription>Dúvidas comuns dos pacientes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                "Preparação para exames",
                "Medicamentos e efeitos",
                "Sintomas comuns",
                "Procedimentos médicos",
                "Horários de atendimento",
                "Agendamento de consultas",
              ].map((topic, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-2"
                  onClick={() => setInput(`Tenho dúvidas sobre ${topic.toLowerCase()}`)}
                >
                  {topic}
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div className="flex items-start space-x-2">
                  <Info size={16} className="text-teal-600 mt-0.5" />
                  <p>Este chat é apenas para dúvidas gerais. Para emergências, ligue para o consultório.</p>
                </div>
                <div className="flex items-start space-x-2">
                  <Info size={16} className="text-teal-600 mt-0.5" />
                  <p>
                    As respostas são geradas por um assistente virtual e não substituem a orientação médica
                    profissional.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
