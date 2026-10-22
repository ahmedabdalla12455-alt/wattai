package com.wattai.energy

import android.app.Activity
import android.os.Bundle
import android.graphics.Color
import android.view.Gravity
import android.widget.Button
import android.widget.LinearLayout
import android.widget.TextView
import android.content.Intent
import android.net.Uri

class MainActivity : Activity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val layout = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            gravity = Gravity.CENTER
            setPadding(32, 32, 32, 32)
            setBackgroundColor(Color.rgb(2, 6, 23))
        }
        val title = TextView(this).apply {
            text = "WattAI"
            textSize = 32f
            setTextColor(Color.rgb(6, 182, 212))
            gravity = Gravity.CENTER
        }
        val description = TextView(this).apply {
            text = "AI Energy Monitor\n\nافتح لوحة التحكم لمتابعة بيانات WattAI."
            textSize = 18f
            setTextColor(Color.WHITE)
            gravity = Gravity.CENTER
            setPadding(0, 24, 0, 24)
        }
        val open = Button(this).apply {
            text = "فتح لوحة التحكم"
            setOnClickListener {
                startActivity(Intent(Intent.ACTION_VIEW,
                    Uri.parse("https://wattai-eight.vercel.app/")))
            }
        }
        layout.addView(title)
        layout.addView(description)
        layout.addView(open)
        setContentView(layout)
    }
}
