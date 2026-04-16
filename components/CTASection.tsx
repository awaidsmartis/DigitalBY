'use client'

import { ArrowRight } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-r from-primary via-secondary to-accent p-1 overflow-hidden animate-fade-in-up">
          <div className="bg-background rounded-3xl p-12 md:p-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Ready to Transform Your Business?
              </span>
            </h2>

            <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
              Join thousands of organizations already experiencing the power of Smart IS solutions. Get started with a personalized demo today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-semibold text-lg hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 group">
                Schedule Demo
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 rounded-lg border-2 border-primary/30 text-primary font-semibold hover:bg-primary/5 transition-all duration-300">
                View Documentation
              </button>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 pt-8 border-t border-border/30 flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  99.99%
                </p>
                <p className="text-foreground/60 text-sm">Uptime SLA</p>
              </div>
              <div className="hidden sm:block w-px h-12 bg-border" />
              <div className="text-center">
                <p className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  24/7
                </p>
                <p className="text-foreground/60 text-sm">Expert Support</p>
              </div>
              <div className="hidden sm:block w-px h-12 bg-border" />
              <div className="text-center">
                <p className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  SOC 2
                </p>
                <p className="text-foreground/60 text-sm">Certified</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
